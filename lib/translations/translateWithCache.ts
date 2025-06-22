import { Locale } from '@/lib/constants'
import { getTranslation, setTranslation } from './translationsCache'
import { translateText } from './translateText'

type TranslatableContent = Record<string, string>
type TranslatedResult = {
  data: TranslatableContent
  translated: boolean
  updatedAt: string
}

export async function translateWithCache({
  locale,
  updatedAt,
  content,
}: {
  locale: Locale
  updatedAt: string
  content: TranslatableContent
}): Promise<TranslatedResult> {
  const cacheKey = `${locale}:${updatedAt}`
  console.log('🔑 Looking for translation', cacheKey)

  const cached = await getTranslation(locale, updatedAt)
  if (cached && Object.values(cached).every((v) => v)) {
    console.log('✅ Using cached translation')
    return {
      data: cached,
      translated: true,
      updatedAt,
    }
  }

  console.log('📡 Calling OpenAI to translate...')

  const entries = await Promise.all(
    Object.entries(content).map(async ([key, value]) => {
      const translated = await translateText(value, locale)
      return [key, translated] as const
    })
  )

  const result = Object.fromEntries(entries) as TranslatableContent

  const isValid = Object.values(result).every((v) => v && v !== 'Error')

  if (!isValid) {
    console.warn('⚠️ Traducción inválida. Devolviendo fallback.')

    const fallback = Object.fromEntries(
      Object.keys(content).map((k) => [k, `Fallback ${k}`])
    ) as TranslatableContent

    return {
      data: fallback,
      translated: false,
      updatedAt,
    }
  }

  await setTranslation(locale, updatedAt, result)
  console.log('✅ Traducción guardada en Redis')

  return {
    data: result,
    translated: true,
    updatedAt,
  }
}
