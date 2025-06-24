export async function translateText(text: string, to: string | string[]) {
  if (!text) return 'Error'

  try {
    console.log('🌍 Traducción solicitada a OPENAI:', text)
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
        temperature: 0.2,
      }),
    })

    const json = await res.json()
    const translated = json?.choices?.[0]?.message?.content

    console.log('🌍 Traducción recibida:', translated)

    if (!translated || typeof translated !== 'string') {
      console.warn('⚠️ Traducción no válida:', json)
      return 'Error'
    }

    return translated
  } catch (e) {
    console.error('❌ Error al traducir con OpenAI:', e)
    return 'Error'
  }
}
