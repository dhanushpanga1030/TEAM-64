import express from 'express';

const router = express.Router();

// AI Tutor Chat Endpoint
router.post('/api/chat', async (req, res) => {
  try {
    const { message, mode = 'learning', context = '' } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ 
        error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' 
      });
    }

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // System prompt based on mode
    const systemPrompts = {
      learning: `You are SANKALP, an AI tutor for STEM education. Help students understand concepts clearly and simply. 
                  Provide examples, hints, and step-by-step guidance. Use simple language suitable for grades 6-12.
                  Context: ${context}`,
      assessment: `You are SANKALP AI tutor in ASSESSMENT mode. Help students understand concepts but DO NOT give direct answers.
                   Provide hints and guidance instead. Preserve academic integrity.
                   Context: ${context}`
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.learning;

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemPrompt }
          },
          contents: [
            {
              parts: [{ text: message }]
            }
          ],
          safety_settings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.error?.message || 'Gemini API request failed' 
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    res.json({ reply, mode, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Health check
router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', gemini_configured: !!process.env.GEMINI_API_KEY });
});

export default router;
