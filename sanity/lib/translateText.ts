export async function translateText(text: string, to: 'es' | 'en') {
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
          content: `Translate the following text into ${to}, preserving meaning and tone.`,
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
}
