# PodBot - Chat API with Redis Agent Memory Server

## Overview
Built a TypeScript-based chat API that integrates with Redis Agent Memory Server (AMS) to create PodBot - a specialized chatbot that provides podcast recommendations and discusses podcast-related topics.

## Architecture
- **Frontend**: Vite + TypeScript SPA with nginx reverse proxy
- **Backend**: Node.js with Express and TypeScript
- **Memory**: Redis Agent Memory Server (AMS) for persistent conversation history
- **LLM**: OpenAI GPT-4o-mini via LangChain
- **Deployment**: Docker Compose with Redis, AMS, Chat API, and Web UI services

## API Endpoints
- `GET /sessions/:username` - Retrieve conversation history
- `POST /sessions/:username` - Send message and get response
- `DELETE /sessions/:username` - Clear conversation history
- `GET /health` - Health check endpoint

## Key Features
- **Frontend Web Interface**: Modern responsive chat UI with markdown support
- **Persistent Memory**: Conversation history across sessions via AMS
- **PodBot Persona**: Specialized chatbot that only discusses podcasts
- **RESTful API**: Clean backend architecture
- **Full Stack TypeScript**: End-to-end type safety
- **Docker Deployment**: Containerized microservices architecture
- **Real-time Chat**: Instant messaging with loading states
- **Session Management**: Load, clear, and manage user conversations

## Project Structure
```
chat-api/                      # Backend API service
├── src/
│   ├── adapters/
│   │   ├── agent-adapter.ts   # PodBot LLM agent
│   │   └── memory-server.ts   # AMS client functions
│   ├── config/
│   │   └── config.ts          # Environment configuration
│   ├── routes/
│   │   └── chat-routes.ts     # Express routes
│   ├── services/
│   │   └── chat-service.ts    # Business logic
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

agent-memory-server/           # AMS Docker build
└── Dockerfile                 # Builds AMS from GitHub
```

## Environment Variables
- `OPENAI_API_KEY` - OpenAI API key
- `AMS_BASE_URL` - Agent Memory Server URL (default: http://localhost:8000)
- `AMS_CONTEXT_WINDOW_MAX` - Token limit for context window (default: 4000)
- `PORT` - Server port (default: 3001)

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

## Key Implementation Details

### Backend (chat-api)
- **Architecture**: Clean separation with adapters, services, routes, and config layers
- **AMS Integration**: Uses `context_window_max` parameter in AMS calls for memory management
- **Message Conversion**: Converts between AMS message format and LangChain message classes
- **Type Safety**: TypeScript types for consistent message handling across the application
- **Error Handling**: Comprehensive error handling for all AMS operations and API endpoints
- **Health Monitoring**: Health check endpoint for container monitoring and service discovery

### Frontend (chat-web)
- **Vite Build System**: Fast development and optimized production builds
- **TypeScript**: Full type safety with consistent message types across frontend/backend
- **Nginx Reverse Proxy**: Routes API calls to backend, serves static assets efficiently
- **Markdown Rendering**: Bot responses rendered with marked.js for rich text display
- **Local Storage**: Persistent username across browser sessions for better UX
- **Error Handling**: User-friendly error messages with detailed API error information
- **Loading States**: Visual feedback during API operations with disabled UI elements
- **FontAwesome Icons**: Modern iconography throughout the interface
- **Responsive Design**: Clean, modern UI that works across different screen sizes

## Development Commands

### Backend (chat-api)
```bash
cd chat-api
npm run build    # Build TypeScript
npm run dev      # Development server
npm run start    # Production server
```

### Frontend (chat-web)
```bash
cd chat-web
npm run dev      # Vite development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Docker Commands
```bash
docker-compose up -d                          # Start all services
docker-compose build chat-api                 # Rebuild chat API
docker-compose build chat-web                 # Rebuild frontend
docker-compose build agent-memory-server      # Rebuild AMS
docker-compose logs chat-api                  # View API logs
docker-compose logs chat-web                  # View web logs
docker-compose logs agent-memory-server       # View AMS logs
docker-compose logs redis                     # View Redis logs
```

## Future Enhancements
- **User Authentication**: Secure login system with protected sessions
- **Multiple Bot Personas**: Different AI assistants for various topics
- **Conversation Analytics**: Usage metrics and conversation insights
- **Export Functionality**: Download conversation history in various formats
- **Real-time Updates**: WebSocket support for live messaging
- **Dark Mode**: Theme switching for better user experience
- **Mobile Optimization**: Enhanced responsive design for mobile devices