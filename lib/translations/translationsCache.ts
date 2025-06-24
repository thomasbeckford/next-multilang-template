import redis from '../redis'

export async function getTranslation(
  locales: string | string[],
  updatedAt: string
) {
  const key = `translation:${locales}:${updatedAt}`
  return (await redis.get<Record<string, string>>(key)) ?? null
}

export async function setTranslation(
  locales: string | string[],
  updatedAt: string,
  data: Record<string, string>
) {
  const key = `translation:${locales}:${updatedAt}`
  await redis.set(key, data, { ex: 60 * 60 * 24 * 7 }) // 7 días
}
