/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'pidora.ca' },
      { protocol: 'https', hostname: 'image.made-in-china.com' },
      { protocol: 'https', hostname: 'rozitek.com' },
    ],
  },
}

export default nextConfig
