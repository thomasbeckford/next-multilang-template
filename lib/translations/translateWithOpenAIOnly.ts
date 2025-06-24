import { translateText } from './translateText'
import { flatten, unflatten } from 'flat'

type TranslatableContent = Record<string, any>

export async function translateWithOpenAIOnly({
  locale,
  content,
  doNotTranslate,
}: {
  locale: string
  content: TranslatableContent
  doNotTranslate?: string[]
}): Promise<{ data: TranslatableContent }> {
  const flatContent = flatten(content) as Record<string, string>

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
  return { data: unflatten(result) }
}
