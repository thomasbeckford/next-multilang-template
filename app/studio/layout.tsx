export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('Entra al layout del studio')
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
