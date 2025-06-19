import { sanityClient } from './client'

export async function getContactData(locale: 'es' | 'en') {
  const query = `*[_type == "contact"][0]`
  const data = await sanityClient.fetch(query)

  return {
    title: data?.title?.[locale] ?? '',
    description: data?.description?.[locale] ?? '',
  }
}
