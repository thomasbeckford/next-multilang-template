import { auth } from '@clerk/nextjs/server'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { getPostData } from '@/sanity/queries'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { userId } = await auth()
  const { locale } = await params
  const content = await getPostData(locale as 'es' | 'en')

  console.log(content)

  return (
    <Container className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
        <p className="text-muted-foreground">User ID: {userId}</p>
      </div>

      <ul className="space-y-4">
        {content?.posts?.map(
          (post: {
            _id: string
            slug: {
              current: string
            }
            title: string
            publishedAt: string
            mainImage: {
              alt: string
              asset: {
                _ref: string
                _type: string
              }
            }
            translated: boolean
          }) => (
            <li key={post._id} className="border-b pb-2">
              <Link href={`/${locale}/posts/${post.slug.current}`}>
                <h2 className="text-lg font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground">
                {post.publishedAt}
              </p>
              {post.translated && (
                <p className="text-sm italic text-green-400">
                  Automatic translation generated with AI
                </p>
              )}
            </li>
          )
        )}
      </ul>
    </Container>
  )
}
