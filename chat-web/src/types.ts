// API Message types (matching backend)
export interface AmsMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface WorkingMemory {
  session_id: string;
  namespace: string;
  context: string;
  messages: AmsMessage[];
}

// API Request/Response types
export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  memory: WorkingMemory;
}

export interface SessionHistoryResponse {
  messages: AmsMessage[];
}

// Frontend UI state types
export interface AppState {
  username: string;
  messages: AmsMessage[];
  isLoading: boolean;
  error: string | null;
}

// UI Message display type
export interface DisplayMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}