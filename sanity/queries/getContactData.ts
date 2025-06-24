import { sanityClient } from '../client'
import { translateWithCacheSanity } from '@/lib/translations/translateWithCacheSanity'

export async function getContactData(locale: string) {
  const query = `*[_type == "contact"][0]`
  const data = await sanityClient.fetch(query)

  return translateWithCacheSanity({
    locale,
    updatedAt: data._updatedAt,
    content: {
      title: data.title,
      description: data.description,
    },
  })
}
