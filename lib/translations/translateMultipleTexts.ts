export async function translateMultipleTexts({ texts, to }: { texts: string[]; to: string }): Promise<string[]> {
  if (!texts.length) return [];

  const prompt = `
You are a professional translation engine working for SoyMenu. Translate the following JSON array of food-related texts from Spanish into '${to}'. Return only a JSON array of translated strings in the same order.

Do not include any additional explanation or formatting. No quotes, no numbering, no markdown, just the translated JSON array.

${JSON.stringify(texts)}
`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: 'You are a professional translator for food menus.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  const json = await res.json();

  const translated = json?.choices?.[0]?.message?.content;

  try {
    const parsed = JSON.parse(translated);

    if (!Array.isArray(parsed)) throw new Error('Not an array');
    return parsed;
  } catch (e) {
    console.error(e);
    console.error('❌ Error parsing translation:', translated);
    return texts;
  }
}
