import { sanityClient } from '../client'
import { translateWithCache } from '@/lib/translations/translateWithCache'

export async function getContactData(locale: string) {
  const query = `*[_type == "contact"][0]`
  const data = await sanityClient.fetch(query)

  return translateWithCache({
    locale,
    updatedAt: data._updatedAt,
    content: {
      title: data.title,
      description: data.description,
    },
  })
}
