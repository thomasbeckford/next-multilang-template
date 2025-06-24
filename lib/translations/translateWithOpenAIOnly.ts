import { translateText } from './translateText'
import { flatten, unflatten } from 'flat'
import pLimit from 'p-limit'

const limit = pLimit(3)

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

  const promises = Object.entries(flatContent).map(([key, value]) =>
    limit(async () => {
      if (doNotTranslate?.some((excluded) => key.endsWith(excluded))) {
        return [key, value]
      }

      try {
        if (!/[a-zA-ZÀ-ÿ]/.test(value.trim())) {
          return [key, value] // no contiene letras, no traducir
        }
        const translated = await translateText(value, locale)
        return [key, translated]
      } catch (error) {
        console.error(`Translation failed for key "${key}":`, error)
        return [key, value] // fallback to original
      }
    })
  )

  const settled = await Promise.allSettled(promises)

  const entries = settled
    .filter(
      (r): r is PromiseFulfilledResult<[string, string]> =>
        r.status === 'fulfilled'
    )
    .map((r) => r.value)

  const result = Object.fromEntries(entries)
  return { data: unflatten(result) }
}
