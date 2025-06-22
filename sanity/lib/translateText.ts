import { Locale } from '@/lib/constants'

export async function translateText(text: string, to: Locale) {
  try {
    console.log('📡 Llamando a OpenAI', {
      env: typeof window === 'undefined' ? 'server' : 'client',
      text,
    })

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a translation engine. Translate the provided plain text from its original language into '${to}'. Keep the output faithful, neutral, and identical in meaning. Do NOT add or remove any punctuation or formatting. Return ONLY the translated text. Do NOT add quotes.`,
          },
          {
            role: 'user',
            content: text,
          },
        ],
      }),
    })

    const json = await res.json()
    return json.choices?.[0]?.message?.content || 'Error'
  } catch (e) {
    console.log(e)
    return 'Error'
  }
}
