// lib/translations/translateWithCacheSanity.ts
import { translateText } from './translateText'
import { flatten, unflatten } from 'flat'
import { getTranslation, setTranslation } from './translationsCache'

type TranslatableContent = Record<string, any>

export async function translateWithCacheSanity({
  locale,
  updatedAt,
  content,
  doNotTranslate,
}: {
  locale: string
  updatedAt: string
  content: TranslatableContent
  doNotTranslate?: string[]
}): Promise<{ data: TranslatableContent; translated: boolean }> {
  const flatContent = flatten(content) as Record<string, string>

  const cached = await getTranslation(locale, updatedAt)
  if (cached && Object.values(cached).every((v) => v)) {
    return { data: unflatten(cached), translated: true }
  }

  const entries = await Promise.all(
    Object.entries(flatContent).map(async ([key, value]) => {
      if (doNotTranslate?.some((excluded) => key.endsWith(excluded))) {
        return [key, value]
      }

      const translated = await translateText(value, locale)
      return [key, translated]
    })
  )

  const result = Object.fromEntries(entries)
  const isValid = Object.values(result).every((v) => v && v !== 'Error')

  if (isValid) {
    await setTranslation(locale, updatedAt, result)
  }

  return {
    data: unflatten(isValid ? result : {}),
    translated: isValid,
  }
}
