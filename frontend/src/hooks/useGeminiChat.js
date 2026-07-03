/**
 * useGeminiChat - Hook to interact with SANKALP AI Tutor
 * Usage in React components
 */

export async function useGeminiChat(message, mode = 'learning', context = '') {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, mode, context })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get response from AI tutor');
    }

    const data = await response.json();
    return { reply: data.reply, success: true };
  } catch (error) {
    console.error('Chat error:', error);
    return { reply: null, error: error.message, success: false };
  }
}

/**
 * For vanilla JavaScript in HTML files:
 * 
 * async function askAITutor(question) {
 *   const response = await fetch('/api/chat', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ 
 *       message: question, 
 *       mode: 'learning' 
 *     })
 *   });
 *   const data = await response.json();
 *   return data.reply;
 * }
 * 
 * // Usage:
 * const answer = await askAITutor("Explain photosynthesis");
 */
