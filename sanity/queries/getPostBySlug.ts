import { sanityClient } from '../client'
import { translateWithCache } from '@/lib/translations/translateWithCache'

export async function getPostBySlug(locale: string, slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]`
  const post = await sanityClient.fetch(query, { slug })

  if (!post) return null

  const flatContent = {
    title: post.title,
    body: post.body
      .map((b: any) => b.children?.map((c: any) => c.text).join(' ') || '')
      .join('\n\n'),
  }

  const { data } = await translateWithCache({
    locale,
    updatedAt: post._updatedAt || post._createdAt,
    content: flatContent,
  })

  return {
    ...post,
    title: data.title,
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: data.body }],
      },
    ],
    translated: true,
  }
}
