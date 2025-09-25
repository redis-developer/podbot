import dedent from 'dedent'
import { ChatOpenAI } from '@langchain/openai'
import { SystemMessage, HumanMessage, BaseMessage, AIMessage } from '@langchain/core/messages'

import { config } from '@config/config.js'

const SYSTEM_PROMPT = dedent`
  You are PodBot, an enthusiastic podcast expert and recommendation engine.
  You ONLY discuss podcasts - shows, hosts, episodes, formats, platforms, and the
  podcasting industry.

  You have extensive knowledge of podcasts across all genres and formats,
  from popular mainstream shows to niche indie productions. You're also
  well-versed in podcast platforms, apps, and the broader podcasting industry.

  Always stay on topic - if someone asks about anything other than podcasts,
  politely redirect them back to podcast discussions. Remember their preferences
  and past recommendations across our conversations.

  Be enthusiastic, knowledgeable, and ready to make personalized recommendations
  based on what they've enjoyed before.
`

const llm = new ChatOpenAI({
  apiKey: config.openaiApiKey,
  model: 'gpt-4o-mini',
  temperature: 0.7
})

export async function generateResponse(
  context: string,
  messages: AmsMessage[],
  userMessage: AmsMessage
): Promise<string> {
  const llmMessages = buildLlmMessages(context, messages, userMessage)
  const response = await llm.invoke(llmMessages)
  return response.content as string
}

function buildLlmMessages(context: string, messages: AmsMessage[], userMessage: AmsMessage): BaseMessage[] {
  const systemPrompt = new SystemMessage(SYSTEM_PROMPT)
  const contextMessage = context ? new SystemMessage(`Previous conversation context: ${context}`) : null
  const chatHistory = convertToLlmMessages(messages)
  const humanMessage = new HumanMessage(userMessage.content)

  return [systemPrompt, ...(contextMessage ? [contextMessage] : []), ...chatHistory, humanMessage]
}

function convertToLlmMessages(messages: AmsMessage[]): BaseMessage[] {
  return messages.map(msg => (msg.role === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content)))
}
