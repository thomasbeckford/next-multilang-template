import Image from 'next/image'
import React from 'react'
import './style.css'
import locales from '@/i18n/locales'

interface Brand {
  label: string
  imageUrl: string | null
}

const AutoMarquee: React.FC<{
  brands?: Brand[]
}> = (props) => {
  let { brands } = props
  if (!brands?.length) {
    brands = locales.map((locale) => ({
      label: locale.label,
      imageUrl: locale.imageUrl,
    }))
  }

  const duplicateBrands = [...brands]

  while (duplicateBrands.length < 10) {
    duplicateBrands.push(...brands.slice(0, 10 - duplicateBrands.length))
  }

  return (
    <div
      className="marquee fadeout-horizontal"
      style={
        {
          '--num-items': duplicateBrands.length,
        } as React.CSSProperties
      }
    >
      <div className="marquee-track">
        {duplicateBrands.map((brand, index) => (
          <div
            key={brand.label}
            className="marquee-item"
            style={
              {
                '--item-position': index,
              } as React.CSSProperties
            }
          >
            {brand.imageUrl ? (
              <Image
                unoptimized
                src={brand.imageUrl}
                alt={brand.label}
                width={120}
                height={120}
                quality={85}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoMarquee
