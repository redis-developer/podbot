import { Router } from 'express'
import { fetchHistory, processMessage, clearSession, ChatMessage } from '../services/chat-service.js'

const router = Router()

router.get('/sessions/:username', async (req, res) => {
  try {
    const { username } = req.params
    const chatHistory: ChatMessage[] = await fetchHistory(username)
    res.json(chatHistory)
  } catch (error) {
    console.error('Error getting session:', error)
    res.status(500).json({ error: 'Failed to get session' })
  }
})

router.post('/sessions/:username', async (req, res) => {
  try {
    const { username } = req.params
    const { message } = req.body

    if (!message) return res.status(400).json({ error: 'Message is required' })

    const response = await processMessage(username, message)
    res.json({ response })
  } catch (error) {
    console.error('Error processing chat:', error)
    res.status(500).json({ error: 'Failed to process chat' })
  }
})

router.delete('/sessions/:username', async (req, res) => {
  try {
    const { username } = req.params
    await clearSession(username)
    res.json({ success: true })
  } catch (error) {
    console.error('Error clearing session:', error)
    res.status(500).json({ error: 'Failed to clear session' })
  }
})

export default router
