import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400, // 31 days
    // Cho phép ảnh từ local (inno.local → 127.0.0.1) khi dev
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  reactCompiler: true,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
