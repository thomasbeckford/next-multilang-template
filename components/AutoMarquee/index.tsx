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
      {
        label: 'Brand-1',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-2',
        imageUrl: '/globe.svg',
      },
      {
        label: 'Brand-3',
        imageUrl: '/next.svg',
      },
      {
        label: 'Brand-4',
        imageUrl: '/vercel.svg',
      },
      {
        label: 'Brand-5',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-6',
        imageUrl: '/globe.svg',
      },
      {
        label: 'Brand-7',
        imageUrl: '/next.svg',
      },
      {
        label: 'Brand-8',
        imageUrl: '/vercel.svg',
      },
      {
        label: 'Brand-9',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-10',
        imageUrl: '/globe.svg',
      },
      {
        label: 'Brand-11',
        imageUrl: '/next.svg',
      },
      {
        label: 'Brand-12',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-13',
        imageUrl: '/vercel.svg',
      },
      {
        label: 'Brand-14',
        imageUrl: '/globe.svg',
      },
      {
        label: 'Brand-15',
        imageUrl: '/next.svg',
      },
      {
        label: 'Brand-16',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-17',
        imageUrl: '/vercel.svg',
      },
      {
        label: 'Brand-18',
        imageUrl: '/globe.svg',
      },
      {
        label: 'Brand-19',
        imageUrl: '/file.svg',
      },
      {
        label: 'Brand-20',
        imageUrl: '/next.svg',
      },
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
                src={brand.imageUrl}
                alt={brand.label}
                width={120}
                height={120}
                quality={85}
                layout="responsive"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoMarquee
