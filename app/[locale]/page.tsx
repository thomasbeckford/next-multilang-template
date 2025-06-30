import { type Metadata } from "next";

import getMetadata from "@/lib/seo";
import HeroGrid from "@/components/HeroGrid";
import { Container } from "@/components/ui/container";
import ScrollMarquee from "@/components/ScrollMarquee";
import AutoMarquee from "@/components/AutoMarquee";
import Features from "@/components/Features";
import { wordsLine1, wordsLine2 } from "@/i18n/messages/Marquee";
import getPublicTranslations from "@/lib/translations/getPublicTranslations";
import { LocationFinder } from "@/components/LocationFinder";

export const metadata: Metadata = getMetadata({
  title: "Home | ClearSpeak",
  description:
    "This is the homepage of ClearSpeak, a modern multi-language starter.",
  url: "https://clearkspeak1.vercel.app",
  image: "https://clearkspeak1.vercel.app/og-image.jpg",
});

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { HOMEPAGE_TEXTS } = await getPublicTranslations(locale);

  return (
    <section id="home" className="md:space-y-20 space-y-6">
      <HeroGrid title={HOMEPAGE_TEXTS.title} />

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Encuentra tu locación más cercana
        </h1>
        <LocationFinder />
      </div>

      <Container>
        <AutoMarquee />
      </Container>

      <Container>
        <Features
          title={HOMEPAGE_TEXTS.features}
          features={HOMEPAGE_TEXTS.featuresList}
        />
      </Container>

      <ScrollMarquee wordsLine1={wordsLine1} wordsLine2={wordsLine2} />
    </section>
  );
}
