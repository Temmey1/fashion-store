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
    // Don't fail build on type errors during deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
