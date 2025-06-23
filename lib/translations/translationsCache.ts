import redis from '../redis'

export async function getTranslation(locale: string, updatedAt: string) {
  const key = `translation:${locale}:${updatedAt}`
  return (await redis.get<Record<string, string>>(key)) ?? null
}

export async function setTranslation(
  locale: string,
  updatedAt: string,
  data: Record<string, string>
) {
  const key = `translation:${locale}:${updatedAt}`
  await redis.set(key, data, { ex: 60 * 60 * 24 * 7 }) // 7 días
}
