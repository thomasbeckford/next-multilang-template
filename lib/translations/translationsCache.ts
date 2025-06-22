// lib/translationCache.ts
import redis from '../redis'

export async function getTranslation(locale: string, updatedAt: string) {
  const key = `translation:${locale}:${updatedAt}`
  const raw = await redis.get(key)
  return raw ? (JSON.parse(raw) as Record<string, string>) : null
}

export async function setTranslation(
  locale: string,
  updatedAt: string,
  data: Record<string, string>
) {
  const key = `translation:${locale}:${updatedAt}`
  await redis.set(key, JSON.stringify(data), 'EX', 60 * 60 * 24 * 7) // 7 días
}
