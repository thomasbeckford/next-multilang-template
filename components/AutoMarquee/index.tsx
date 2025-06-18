import Image from 'next/image'
import React from 'react'
import './style.css'

interface Brand {
  label: string
  imageUrl: string | null
}

const AutoMarquee: React.FC<{
  brands?: Brand[]
}> = (props) => {
  let { brands } = props
  if (!brands?.length) {
    brands = [
      { label: 'English', imageUrl: 'https://flagcdn.com/us.svg' },
      { label: 'Español', imageUrl: 'https://flagcdn.com/es.svg' },
      { label: 'Français', imageUrl: 'https://flagcdn.com/fr.svg' },
      { label: 'Deutsch', imageUrl: 'https://flagcdn.com/de.svg' },
      { label: 'Português', imageUrl: 'https://flagcdn.com/br.svg' },
      { label: 'Italiano', imageUrl: 'https://flagcdn.com/it.svg' },
      { label: '日本語', imageUrl: 'https://flagcdn.com/jp.svg' },
      { label: '中文', imageUrl: 'https://flagcdn.com/cn.svg' },
      { label: '한국어', imageUrl: 'https://flagcdn.com/kr.svg' },
      { label: 'العربية', imageUrl: 'https://flagcdn.com/sa.svg' },
    ]
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
