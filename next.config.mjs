/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/us-stock-frontend' : '',
  assetPrefix: isProd ? '/us-stock-frontend/' : '',
  output: 'export',
}

export default nextConfig
