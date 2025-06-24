import { sanityClient } from '../client'
import { translateWithCacheSanity } from '@/lib/translations/translateWithCacheSanity'

export async function getPostData(locale: string) {
  const query = `*[_type == "post"]`
  const posts = await sanityClient.fetch(query)

  const translatedPosts = await Promise.all(
    posts.map(async (post: any) => {
      const flatContent = {
        title: post.title,
        body: post.body
          .map((b: any) => b.children?.map((c: any) => c.text).join(' ') || '')
          .join('\n\n'),
      }

      const { data } = await translateWithCacheSanity({
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
    })
  )

  return {
    posts: translatedPosts,
  }
}
