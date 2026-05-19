const https = require('https')

/**
 * Calls the OpenRouter API with the given messages array.
 * Returns the raw text content from the model.
 */
const callOpenRouter = (messages) => {
  return new Promise((resolve, reject) => {

    const body = JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct',
      messages
      // NOTE: response_format removed — not supported by all free models
    })

    const options = {
      hostname: 'openrouter.ai',
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:5000',
        'X-Title': 'Student Saarthi'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data)
          if (parsed.error) {
            return reject(new Error(parsed.error.message || 'OpenRouter API error'))
          }
          const content = parsed.choices?.[0]?.message?.content
          if (!content) {
            return reject(new Error('Empty response from OpenRouter'))
          }
          resolve(content)
        } catch (err) {
          reject(new Error('Failed to parse OpenRouter response: ' + err.message))
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

/**
 * Extracts the first JSON object found anywhere in a string.
 * Handles cases where models add extra text around the JSON.
 */
const extractJSON = (text) => {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON found in AI response')
  return JSON.parse(match[0])
}

/**
 * Analyzes a complaint description using OpenRouter AI.
 * Returns: { priority, department, summary, responseMessage }
 */
const analyzeComplaintWithAI = async (description) => {

  const systemPrompt = `You are an AI assistant for a complaint management system called Student Saarthi.
Analyze the complaint and reply with ONLY a raw JSON object — no markdown, no code fences, no extra text.
Use exactly this format:
{"priority":"<Low|Medium|High|Critical>","department":"<relevant department>","summary":"<one-line summary under 15 words>","responseMessage":"<1-2 sentence polite acknowledgment>"}`

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Complaint: "${description}"` }
  ]

  const rawText = await callOpenRouter(messages)
  const result = extractJSON(rawText)

  return {
    priority: result.priority || 'Low',
    department: result.department || 'General Administration',
    summary: result.summary || description.substring(0, 100),
    responseMessage: result.responseMessage || 'Your complaint has been registered. We will look into it shortly.'
  }
}

module.exports = {
  analyzeComplaintWithAI
}
