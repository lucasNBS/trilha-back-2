/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000'
      }
    ]
  }
};

export default nextConfig;
