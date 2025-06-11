export type MetadataOptions = {
  title: string
  description: string
  url?: string
  image?: string
}

export default function getMetadata({
  title,
  description,
  url = '',
  image,
}: MetadataOptions) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
