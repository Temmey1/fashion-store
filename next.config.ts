/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '**',
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // This setting is temporary and will be removed when the issue is fixed in Next.js 15.3.2
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
