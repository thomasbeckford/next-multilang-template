import crypto from 'crypto'
import { flatten, unflatten } from 'flat'
import { translateText } from './translateText'
import redis from '@/lib/redis'

type TranslatableContent = Record<string, any>

function hashValue(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

export async function translateWithCache({
  locale,
  content,
  doNotTranslate,
}: {
  locale: string
  content: TranslatableContent
  doNotTranslate?: string[]
}): Promise<{ data: TranslatableContent }> {
  const flatContent = flatten(content) as Record<string, string>
  const translations: Record<string, string> = {}

  for (const [key, value] of Object.entries(flatContent)) {
    const trimmed = value.trim()

    // saltar si está excluido o no es una palabra real
    if (
      !/[a-zA-ZÀ-ÿ]/.test(trimmed) ||
      doNotTranslate?.some((d) => key.endsWith(d))
    ) {
      translations[key] = value
      continue
    }

    const hash = hashValue(trimmed)
    const redisKey = `translation:${locale}:${key}:${hash}`

    const cached = await redis.get<string>(redisKey)
    if (cached) {
      translations[key] = cached
      continue
    }

    try {
      const translated = await translateText(trimmed, locale)
      translations[key] = translated
      await redis.set(redisKey, translated)
    } catch (err) {
      console.error(`❌ Error translating key "${key}":`, err)
      translations[key] = value // fallback
    }
  }

  return { data: unflatten(translations) }
}
