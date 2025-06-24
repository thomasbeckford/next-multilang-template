export default async function getPublicTranslations(locale: string) {
  const translations = await import(
    `@/public/translations/${locale}.json`
  ).then((m) => m.default)

  return translations
}
