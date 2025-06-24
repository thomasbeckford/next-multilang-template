import { auth } from '@clerk/nextjs/server'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import { getPostData } from '@/sanity/queries/getPostData'
import { translateWithCache } from '@/lib/translations/translateWithCache'

const UI_TEXTS = {
  welcome: 'Welcome to your dashboard',
  userId: 'User ID',
  autoTranslated: 'Automatic translation generated with AI',
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { userId } = await auth()
  const { locale } = await params
  const content = await getPostData(locale)

  const { data: t } = await translateWithCache({
    locale,
    updatedAt: 'dashboard_page',
    content: UI_TEXTS,
  })

  return (
    <Container className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.welcome}</h1>
        <p className="text-muted-foreground">
          {t.userId}: {userId}
        </p>
      </div>

      <ul className="space-y-4">
        {content?.posts?.map((post) => (
          <li key={post._id} className="border-b pb-2">
            <Link href={`/${locale}/posts/${post.slug.current}`}>
              <h2 className="text-lg font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground">{post.publishedAt}</p>
            {post.translated && (
              <p className="text-sm italic text-green-400">
                {t.autoTranslated}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  )
}
