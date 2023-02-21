/** @type {import('next').NextConfig} */
const ImageDomain = process.env.IMAGE_DOMAIN
const nextConfig = {
  reactStrictMode: true,
  images: {domains: [ImageDomain]},
}

module.exports = nextConfig
