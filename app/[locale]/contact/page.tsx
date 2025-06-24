import { Metadata } from 'next'
import getMetadata from '@/lib/seo'
import { Container } from '@/components/ui/container'
import Card from '@/components/Card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { translateWithCache } from '@/lib/translations/translateWithCache'
import { CONTACT_TEXTS } from '@/i18n/messages/ContactPage'

export const metadata: Metadata = getMetadata({
  title: 'Contact | ClearSpeak',
  description:
    'Contact the ClearSpeak team to learn more about multilingual website solutions.',
  url: 'https://clearkspeak1.app/contact',
  image: 'https://clearkspeak1.app/og-image.jpg',
})


// componente server
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const { data } = await translateWithCache({
    locale,
    updatedAt: 'contact_page',
    content: CONTACT_TEXTS,
  })

  return (
    <section id="contact" className="md:space-y-20 space-y-6">
      <Container className="animate-in fade-in space-y-4">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground">{data.description}</p>
      </Container>

      <Card>
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">{data.section1Title}</h2>

          <div className="space-y-2">
            <p className="text-muted-foreground">
              Reach us at{' '}
              <a
                href="mailto:hello@clearkspeak1.app"
                className="text-primary underline underline-offset-4"
              >
                hello@clearkspeak1.app
              </a>
            </p>
            <p className="text-muted-foreground">
              📍 123 Lang Avenue, London, UK
            </p>
            <p className="text-muted-foreground">
              🕒 Mon–Fri · 9am – 5pm (GMT)
            </p>
          </div>

          <div className="text-muted-foreground">
            Prefer async?{' '}
            <a
              href="https://clearkspeak1.app/support"
              className="text-primary underline underline-offset-4"
            >
              Submit a ticket
            </a>
          </div>

          <p className="text-sm text-muted-foreground italic">
            We speak your language — English, Español, Français, and more.
          </p>
        </div>
      </Card>

      <Container className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">
          {data.section2Title}
        </h2>
        <form className="max-w-xl mx-auto space-y-4">
          <Input type="text" placeholder="Your name" />
          <Input type="email" placeholder="Your email" />
          <Textarea placeholder="Your message..." />
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </Container>

      <Container className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">{data.section3Title}</h2>
        <p className="text-muted-foreground">
          <strong>Q:</strong> Do I need to install anything to use ClearSpeak?
          <br />
          <strong>A:</strong> Nope! Just drop it into your Next.js project.
        </p>
        <p className="text-muted-foreground">
          <strong>Q:</strong> Can I use my own translation files?
          <br />
          <strong>A:</strong> Absolutely. We support fully custom JSON i18n.
        </p>
      </Container>

      <Container className="text-center pt-10">
        <p className="text-muted-foreground text-sm">
          {data.section3Title}{' '}
          <a
            href="mailto:partners@clearkspeak1.app"
            className="underline text-primary"
          >
            {data.section3Body}
          </a>
        </p>
      </Container>
    </section>
  )
}
