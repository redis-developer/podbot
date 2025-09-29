declare global {
  type AmsMessage = {
    role: 'user' | 'assistant'
    content: string
  }

  type WorkingMemory = {
    session_id: string
    namespace: string
    context: string
    messages: AmsMessage[]
  }
}

export {}
