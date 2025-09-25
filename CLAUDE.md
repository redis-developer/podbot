# PodcastBot - Chat API with Redis Agent Memory Server

## Overview
Built a TypeScript-based chat API that integrates with Redis Agent Memory Server (AMS) to create PodcastBot - a specialized chatbot that provides podcast recommendations and discusses podcast-related topics.

## Architecture
- **Backend**: Node.js with Express and TypeScript
- **Memory**: Redis Agent Memory Server (AMS) for persistent conversation history
- **LLM**: OpenAI GPT-4o-mini via LangChain
- **Deployment**: Docker Compose with Redis, AMS, and Chat API services

## API Endpoints
- `GET /sessions/:username` - Retrieve conversation history
- `POST /sessions/:username` - Send message and get response
- `DELETE /sessions/:username` - Clear conversation history
- `GET /health` - Health check endpoint

## Key Features
- Persistent conversation memory across sessions
- PodcastBot persona that only discusses podcasts
- RESTful API design
- Docker containerization
- TypeScript with ES modules
- Path aliases for clean imports

## Project Structure
```
chat-api/
├── src/
│   ├── chat/
│   │   ├── chat-routes.ts     # Express routes
│   │   ├── chat-service.ts    # Business logic
│   │   └── agent.ts           # PodcastBot LLM agent
│   ├── memory/
│   │   └── memory-server.ts   # AMS client functions
│   ├── config/
│   │   └── config.ts          # Environment configuration
│   ├── utils/
│   │   └── message-utils.ts   # Message type conversions
│   ├── types.d.ts             # Global type definitions
│   └── main.ts                # Express server
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Environment Variables
- `OPENAI_API_KEY` - OpenAI API key
- `AMS_BASE_URL` - Agent Memory Server URL (default: http://localhost:8000)
- `AMS_CONTEXT_WINDOW_MAX` - Token limit for context window (500 for testing)
- `PORT` - Server port (default: 3001)

## Docker Services
- `redis` - Redis database (port 6379)
- `agent-memory-server` - AMS service (port 8000)
- `chat-api` - Chat API service (port 3001)

## Testing
Use curl to test the API:

```bash
# Start conversation
curl -X POST http://localhost:3001/sessions/username \
  -H "Content-Type: application/json" \
  -d '{"message": "Recommend some history podcasts"}'

# Get conversation history
curl -X GET http://localhost:3001/sessions/username

# Clear conversation
curl -X DELETE http://localhost:3001/sessions/username
```

## Key Implementation Details
- Uses `context_window_max` parameter in both GET (query param) and PUT (request body) calls to AMS
- Converts between AMS message format and LangChain message classes
- Global TypeScript types for consistent message handling
- Error handling for all AMS operations
- Health check endpoint for container monitoring

## Development Commands
```bash
npm run build    # Build TypeScript
npm run dev      # Development server
npm run start    # Production server
```

## Docker Commands
```bash
docker-compose up -d          # Start all services
docker-compose build chat-api # Rebuild chat API
docker-compose logs chat-api  # View logs
```

## Future Enhancements
- Frontend web interface
- User authentication
- Multiple bot personas
- Conversation analytics
- Export conversation history