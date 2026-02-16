import { withSentryConfig } from '@sentry/nextjs';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  basePath: process.env.NODE_ENV === 'production' ? '/docs' : '', // if serving under /docs path
  reactStrictMode: true,
  images: { unoptimized: true },
  transpilePackages: ['@prisma-docs/eclipse'],
  experimental: {
    globalNotFound: true,
  },
  // docs.prisma.io: in production, redirect all requests to prisma.io/docs (browser navigates to prisma.io).
  async redirects() {
    if (process.env.NODE_ENV !== 'production') {
      return [];
    }
    return [
      {
        source: '/:path*',
        destination: 'https://prisma.io/docs/:path*',
        permanent: false, // use 307 until you've verified the behavior
      },
    ];
  },
};

export default withSentryConfig(withMDX(config), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'prisma-ch',

  project: 'javascript-nextjs',

  authToken: process.env.SENTRY_AUTH_TOKEN,
  tunnelRoute: '/monitoring',

  // Only print logs for uploading source maps in CI\
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
