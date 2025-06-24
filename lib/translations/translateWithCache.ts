import { getTranslation, setTranslation } from './translationsCache'
import { translateText } from './translateText'
import { flatten, unflatten } from 'flat'

type TranslatableContent = Record<string, any>

type TranslatedResult = {
  data: TranslatableContent
  translated: boolean
  updatedAt: string
}

export async function translateWithCache({
  locale,
  updatedAt,
  content,
  doNotTranslate,
}: {
  locale: string
  updatedAt: string
  content: TranslatableContent
  doNotTranslate?: string[]
}): Promise<TranslatedResult> {
  const flatContent = flatten(content) as Record<string, string>
  const cacheKey = `${locale}:${updatedAt}`
  console.log('🔑 Looking for translation', cacheKey)

  const cached = await getTranslation(locale, updatedAt)
  if (cached && Object.values(cached).every((v) => v)) {
    console.log('✅ Using cached translation')
    return {
      data: unflatten(cached),
      translated: true,
      updatedAt,
    }
  }

  console.log('📡 Calling OpenAI to translate...')

  const entries = await Promise.all(
    Object.entries(flatContent).map(async ([key, value]) => {
      if (doNotTranslate?.some((excludedKey) => key.endsWith(excludedKey))) {
        return [key, value] as const
      }
      const translated = await translateText(value, locale)
      return [key, translated] as const
    })
  )

  const result = Object.fromEntries(entries)

  const isValid = Object.values(result).every((v) => v && v !== 'Error')

  if (!isValid) {
    console.warn('⚠️ Traducción inválida. Devolviendo fallback.')
    const fallback = Object.fromEntries(
      Object.keys(flatContent).map((k) => [k, `Fallback ${k}`])
    )
    return {
      data: unflatten(fallback),
      translated: false,
      updatedAt,
    }
  }

  await setTranslation(locale, updatedAt, result)
  console.log('✅ Traducción guardada en Redis')

  return {
    data: unflatten(result),
    translated: true,
    updatedAt,
  }
}
