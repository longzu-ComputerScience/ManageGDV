/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        // allow facebook CDN images (scontent.*.fbcdn.net etc.)
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
      },
    ],
  },
}

module.exports = nextConfig
