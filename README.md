# PodBot

A TypeScript-based chat API that integrates with Redis Agent Memory Server (AMS) to create PodBot - a specialized chatbot for podcast recommendations and discussions.

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/guyroyse/podbot.git
cd podbot
```

2. Set your OpenAI API key:
```bash
export OPENAI_API_KEY="your-api-key-here"
```

3. Start all services:
```bash
docker-compose up -d
```

## Testing the API

```bash
# Start a conversation
curl -X POST http://localhost:3001/sessions/username \
  -H "Content-Type: application/json" \
  -d '{"message": "Recommend some history podcasts"}'

# Get conversation history
curl -X GET http://localhost:3001/sessions/username

# Clear conversation
curl -X DELETE http://localhost:3001/sessions/username
```

## Architecture

- **Backend**: Node.js with Express and TypeScript
- **Memory**: Redis Agent Memory Server (AMS) for persistent conversation history
- **LLM**: OpenAI GPT-4o-mini via LangChain
- **Deployment**: Docker Compose with Redis, AMS, and Chat API services

## Services

- `redis` - Redis database (port 6379)
- `agent-memory-server` - AMS service (port 8000)
- `chat-api` - Chat API service (port 3001)

## Development

```bash
cd chat-api
npm install
npm run dev
```

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key (required)
- `AMS_BASE_URL` - Agent Memory Server URL (default: http://localhost:8000)
- `AMS_CONTEXT_WINDOW_MAX` - Token limit for context window (default: 500)
- `PORT` - Server port (default: 3001)