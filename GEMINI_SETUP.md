# SANKALP - Gemini AI Tutor Setup Guide

## 🔑 Getting Your Gemini API Key

1. **Visit** [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account (free)
3. **Click** "Create API Key"
4. **Copy** the generated key (keep it secret!)

## 🚀 Local Development Setup

### 1. Copy the environment template
```bash
cp Backend/.env.example Backend/.env
```

### 2. Add your API key to `Backend/.env`
```
GEMINI_API_KEY=paste_your_key_here
NODE_ENV=development
PORT=5000
```

### 3. Install dependencies
```bash
cd Backend
npm install
cd ../frontend
npm install
```

### 4. Run development server
```bash
npm run dev
```

### 5. Test the API
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is photosynthesis?","mode":"learning"}'
```

## 🌐 Render Deployment Setup

### 1. **Revoke the old key** (if you shared it)
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Delete the old key
   - Generate a NEW key

### 2. **Add to Render Environment**
   - Go to your Render dashboard
   - Select your service
   - **Environment** → **Add Environment Variable**
   - Key: `GEMINI_API_KEY`
   - Value: `your_new_gemini_api_key`
   - **Save and Deploy**

### 3. **Set Build Command**
```bash
cd frontend && npm install && npm run build
```

### 4. **Set Publish Directory**
```
frontend/dist/public
```

## 📡 API Endpoints

### Chat with AI Tutor
**POST** `/api/chat`

**Request:**
```json
{
  "message": "How do I solve this equation?",
  "mode": "learning",
  "context": "We're studying linear equations"
}
```

**Response:**
```json
{
  "reply": "To solve a linear equation...",
  "mode": "learning",
  "timestamp": "2025-12-14T10:30:00.000Z"
}
```

### Health Check
**GET** `/api/health`

**Response:**
```json
{
  "status": "ok",
  "gemini_configured": true
}
```

## 🛡️ Security Best Practices

✅ **DO:**
- Store API key in environment variables only
- Use `.env` for local development
- Set `NODE_ENV=production` on Render
- Implement rate limiting (optional)

❌ **DON'T:**
- Commit `.env` file to git
- Share API keys in chat/code
- Hardcode keys in source files
- Expose keys in error messages

## 📝 Modes Explained

### Learning Mode (Default)
- Student is learning a concept
- AI provides full explanations, examples, hints
- Helps build understanding

### Assessment Mode
- Student is taking a quiz/test
- AI provides hints but NOT direct answers
- Preserves academic integrity

**Usage:**
```javascript
// Learning mode - full help
await fetch('/api/chat', {
  body: JSON.stringify({
    message: "Explain photosynthesis",
    mode: "learning"
  })
});

// Assessment mode - hints only
await fetch('/api/chat', {
  body: JSON.stringify({
    message: "What is photosynthesis?",
    mode: "assessment"
  })
});
```

## 🐛 Troubleshooting

### "API key not configured"
- Check that `GEMINI_API_KEY` is set in environment variables
- Restart your server after adding the key

### "401 Unauthorized"
- Your API key is invalid or expired
- Generate a new key from Google AI Studio

### "403 Forbidden"
- You may have hit your API quota
- Check your usage in Google AI Studio dashboard

## 📚 Resources
- [Google Generative AI Docs](https://ai.google.dev/)
- [Gemini API Reference](https://ai.google.dev/api/rest/v1beta/models/generateContent)
- [SANKALP GitHub Repo](https://github.com/dhanushpanga1030/TEAM-64)
