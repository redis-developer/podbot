import { config } from '@config/config.js'

/**
 * Retrieve conversation history for a session
 */
export async function readWorkingMemory(sessionId: string, namespace: string): Promise<WorkingMemory> {
  const url = new URL(`/v1/working-memory/${sessionId}`, config.amsBaseUrl)
  url.searchParams.set('namespace', namespace)

  console.log(`[AMS GET] ${url.toString()}`)

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Version': '0.12.0'
    }
  })

  if (!response.ok) {
    if (response.status === 404) {
      // Return empty session for new users
      console.log(`[AMS GET] Session not found, returning empty session`)
      return {
        session_id: sessionId,
        namespace: namespace,
        context: '',
        messages: []
      }
    }
    throw new Error(`Failed to get working memory: ${response.statusText}`)
  }

  const data = (await response.json()) as WorkingMemory
  console.log(`[AMS GET] Response:`, JSON.stringify(data, null, 2))

  return data
}

/**
 * Replace conversation history for a session
 */
export async function replaceWorkingMemory(workingMemory: WorkingMemory): Promise<void> {
  const url = `${config.amsBaseUrl}/v1/working-memory/${workingMemory.session_id}`
  const payload = { ...workingMemory, context_window_max: config.amsContextWindowMax }

  console.log(`[AMS PUT] ${url}`)
  console.log(`[AMS PUT] Request body:`, JSON.stringify(payload, null, 2))

  const bodyString = JSON.stringify(payload)
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Version': '0.12.0'
    },
    body: bodyString
  })

  if (!response.ok) throw new Error(`Failed to replace working memory: ${response.statusText}`)

  const responseData = await response.text()
  console.log(`[AMS PUT] Success - Status: ${response.status}`)

  try {
    const parsedResponse = JSON.parse(responseData)
    console.log(`[AMS PUT] Response:`, JSON.stringify(parsedResponse, null, 2))
  } catch {
    console.log(`[AMS PUT] Response:`, responseData || '(empty response)')
  }
}

/**
 * Delete conversation history for a session
 */
export async function removeWorkingMemory(sessionId: string, namespace: string): Promise<void> {
  const url = new URL(`/v1/working-memory/${sessionId}`, config.amsBaseUrl)
  url.searchParams.set('namespace', namespace)

  console.log(`[AMS DELETE] ${url.toString()}`)

  const response = await fetch(url.toString(), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Version': '0.12.0'
    }
  })

  console.log(`[AMS DELETE] Response Status: ${response.status}`)

  if (!response.ok) throw new Error(`Failed to delete working memory: ${response.statusText}`)
}
