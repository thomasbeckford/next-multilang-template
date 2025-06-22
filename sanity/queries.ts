import { sanityClient } from './client'
import { translateText } from '../lib/translations/translateText'
import { Locale } from '@/lib/constants'
import { translateWithCache } from '@/lib/translations/translateWithCache'

export async function getContactData(locale: Locale) {
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

export async function getPostData(locale: Locale) {
  const query = `*[_type == "post"]`
  const posts = await sanityClient.fetch(query)

  const translatedPosts = await Promise.all(
    posts.map(async (post: { title: string; body: any }) => {
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

export async function getPostBySlug(locale: Locale, slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]`
  const post = await sanityClient.fetch(query, { slug })

  if (!post) return null

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
      { _type: 'block', children: [{ text: translatedBody, _type: 'span' }] },
    ],
    translated: true,
  }
}
