import { getPostBySlug } from '@/sanity/queries/getPostBySlug'
import { Container } from '@/components/ui/container'
import { PortableText } from '@portabletext/react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { translateWithCacheSanity } from '@/lib/translations/translateWithCacheSanity'

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { locale, slug } = await props.params
  const post = await getPostBySlug(locale, slug)

  return {
    title: post?.title ?? 'Post',
    description: post?.body?.[0]?.children?.[0]?.text ?? '',
  }
}

const UI_TEXTS = {
  notFound: 'Post not found',
  autoTranslated: 'Automatic translation generated with AI',
  by: 'by',
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPostBySlug(locale, slug)

  const { data: t, translated } = await translateWithCacheSanity({
    locale,
    updatedAt: '2025-06-23',
    content: UI_TEXTS,
  })

  if (!post) {
    return (
      <Container>
        <h1 className="text-2xl font-bold">{t.notFound}</h1>
      </Container>
    )
  }

  return (
    <Container className="space-y-6">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-sm text-muted-foreground">
        {post.author && (
          <>
            {t.by} {post.author.name} ·{' '}
          </>
        )}
        {dayjs(post.publishedAt).format('MMMM D, YYYY')}
      </p>

      {post.mainImage && (
        <div className="relative h-64 w-full">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.mainImage.alt}
            fill
            className="object-cover rounded-xl"
            style={{
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
              maskSize: 'cover',
              viewTransitionName: post.title,
            }}
          />
        </div>
      )}

      <article className="prose dark:prose-invert">
        <PortableText value={post.body} />
      </article>

      {translated && (
        <p className="text-sm italic text-green-400">{t.autoTranslated}</p>
      )}
    </Container>
  )
}
