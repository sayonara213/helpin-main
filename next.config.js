const createNextIntlPlugin = require('next-intl/plugin');

const withSerwist = require('@serwist/next').default({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/**',
      },
      {
        protocol: 'https',
        hostname: 'qnhadjldspaiurrucbzl.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'ahnxdjsimhvpcnbeqzqo.supabase.co',
        port: '',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withSerwist(withNextIntl(nextConfig));
