# PodBot - Chat API with Redis Agent Memory Server

A TypeScript-based chat API that integrates with Redis Agent Memory Server (AMS)
to create PodBot - a specialized chatbot that provides podcast recommendations
and discusses podcast-related topics.

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/guyroyse/podbot.git
cd podbot
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. Start all services:

```bash
docker-compose up
```

4. Access the web interface at http://localhost:3000

## Architecture

- **Frontend**: Vite + TypeScript SPA with nginx reverse proxy
- **Backend**: Node.js with Express and TypeScript
- **Memory**: Redis Agent Memory Server (AMS) for persistent conversation history
- **LLM**: OpenAI GPT-4o-mini via LangChain
- **Deployment**: Docker Compose with Redis, AMS, Chat API, and Web UI services

## Key Features

- **Frontend Web Interface**: Modern responsive chat UI with markdown support
- **Persistent Memory**: Conversation history across sessions via AMS
- **PodBot Persona**: Specialized chatbot that only discusses podcasts
- **RESTful API**: Clean backend architecture
- **Full Stack TypeScript**: End-to-end type safety
- **Docker Deployment**: Containerized microservices architecture
- **Real-time Chat**: Instant messaging with loading states
- **Session Management**: Load, clear, and manage user conversations

## API Endpoints

- `GET /sessions/:username` - Retrieve conversation history
- `POST /sessions/:username` - Send message and get response
- `DELETE /sessions/:username` - Clear conversation history
- `GET /health` - Health check endpoint

## Project Structure

```
chat-api/                      # Backend API service
├── src/
│   ├── chat/
│   │   ├── chat-routes.ts     # Express routes
│   │   ├── chat-service.ts    # Business logic
│   │   └── agent.ts           # PodBot LLM agent
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

chat-web/                      # Frontend web interface
├── src/
│   ├── main.ts                # Application entry point
│   ├── api.ts                 # API client for chat-api
│   ├── types.ts               # TypeScript type definitions
│   └── style.css              # Application styles
├── public/                    # Static assets
├── dist/                      # Built assets (generated)
├── Dockerfile                 # Multi-stage build with nginx
├── nginx.conf                 # Nginx proxy configuration
├── index.html                 # HTML template
├── package.json
└── tsconfig.json
```

## Docker Services

- `redis` - Redis database (port 6379)
- `agent-memory-server` - AMS service (port 8000)
- `chat-api` - Chat API service (port 3001)
- `chat-web` - Frontend web interface (port 3000)

## Usage

### Web Interface

1. Open http://localhost:3000 in your browser
2. Enter a username and click "Load" to load existing conversations
3. Type messages about podcasts and get AI-powered recommendations
4. Use "Clear" to delete conversation history

### API Testing

Use curl to test the backend API directly:

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

## Development

### Backend (chat-api)

```bash
cd chat-api
npm install
npm run build    # Build TypeScript
npm run dev      # Development server
npm run start    # Production server
```

### Frontend (chat-web)

```bash
cd chat-web
npm install
npm run dev      # Vite development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Docker Commands

```bash
docker-compose up              # Start all services
docker-compose build chat-api  # Rebuild chat API
docker-compose build chat-web  # Rebuild frontend
docker-compose logs chat-api   # View API logs
docker-compose logs chat-web   # View web logs
docker-compose logs agent-memory-server  # View AMS logs
```

## Environment Variables

- `OPENAI_API_KEY` - OpenAI API key (required)
- `AMS_BASE_URL` - Agent Memory Server URL (default: http://localhost:8000)
- `AMS_CONTEXT_WINDOW_MAX` - Token limit for context window (default: 500)
- `PORT` - Server port (default: 3001)
