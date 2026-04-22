/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@winsznx/stxpet-core'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
