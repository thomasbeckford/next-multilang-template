import { sanityClient } from './client'
import { translateText } from './lib/translateText'

export async function getContactData(locale: 'es' | 'en') {
  const query = `*[_type == "contact"][0]`
  const data = await sanityClient.fetch(query)

  return {
    title: data?.title?.[locale] ?? '',
    description: data?.description?.[locale] ?? '',
  }
}

export async function getPostData(locale: 'es' | 'en') {
  const fallbackLocale: 'es' | 'en' = locale === 'es' ? 'en' : 'es'

  const query = `*[_type == "post" && language == $locale]`
  const data = await sanityClient.fetch(query, { locale })

  if (data.length > 0) {
    return { posts: data }
  }

  // Si no hay contenido en el idioma pedido, buscamos en fallback y traducimos
  const fallbackData = await sanityClient.fetch(query, {
    locale: fallbackLocale,
  })

  const translatedPosts = await Promise.all(
    fallbackData.map(async (post: any) => {
      const translatedTitle = await translateText(post.title, locale)
      const translatedBody = await translateText(
        post.body
          .map((b: any) => b.children?.map((c: any) => c.text).join(' ') || '')
          .join('\n\n'),
        locale
      )

      return {
        ...post,
        title: translatedTitle,
        body: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: translatedBody }],
          },
        ],
        translated: true,
      }
    })
  )

  return {
    posts: translatedPosts,
  }
}

export async function getPostBySlug(locale: 'es' | 'en', slug: string) {
  const FALLBACK_LOCALE = locale === 'es' ? 'en' : 'es'

  const query = `*[_type == "post" && language == $locale && slug.current == $slug][0]`
  const params = { locale, slug }

  const data = await sanityClient.fetch(query, params)

  if (data) {
    return data
  }

  // No existe en el idioma pedido, intentamos con el original (en)
  const fallbackPost = await sanityClient.fetch(
    `*[_type == "post" && language == $locale && slug.current == $slug][0]`,
    { locale: FALLBACK_LOCALE, slug }
  )

  if (!fallbackPost) return null

  // Traducir con IA
  const translatedTitle = await translateText(fallbackPost.title, locale)
  const translatedBody = await translateText(
    fallbackPost.body
      .map((b: any) => b.children?.map((c: any) => c.text).join(' ') || '')
      .join('\n\n'),
    locale
  )

  return {
    ...fallbackPost,
    title: translatedTitle,
    body: [
      { _type: 'block', children: [{ text: translatedBody, _type: 'span' }] },
    ],
    translated: true,
  }
}
