import { readWorkingMemory, replaceWorkingMemory, removeWorkingMemory } from '@memory/memory-server.js'
import { generateResponse } from './agent.js'
import { config } from '@config/config.js'

export async function fetchHistory(username: string): Promise<AmsMessage[]> {
  try {
    const memory = await readWorkingMemory(username, 'chat')
    return memory.messages
  } catch (error) {
    console.error('Error reading working memory:', error)
    return []
  }
}

export async function processMessage(username: string, message: string): Promise<string> {
  try {
    // Get existing working memory
    const { context, messages } = await readWorkingMemory(username, 'chat')

    // Get AI response
    const userMessage: AmsMessage = { role: 'user', content: message }
    const aiResponse = await generateResponse(context, messages, userMessage)

    // Build up message history
    const aiMessage: AmsMessage = { role: 'assistant', content: aiResponse }
    const newMessages = [...messages, userMessage, aiMessage]

    // Save updated message history
    await replaceWorkingMemory(username, config.amsContextWindowMax, {
      session_id: username,
      namespace: 'chat',
      context: context,
      messages: newMessages
    })

    // Return AI response
    return aiResponse
  } catch (error) {
    console.error('Error processing message:', error)
    return `Error processing message: ${error}`
  }
}

export async function clearSession(username: string): Promise<void> {
  try {
    await removeWorkingMemory(username, 'chat')
  } catch (error) {
    console.error('Error clearing session:', error)
  }
}
