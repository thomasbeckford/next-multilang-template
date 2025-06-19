import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin()

nextConfig.rewrites = async () => {
  return [
    {
      source: '/studio/:path*',
      destination: '/studio/index.html',
    },
  ]
}

export default withNextIntl(nextConfig)
