import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: { unoptimized: true },
  transpilePackages: ["@prisma-docs/eclipse"],
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: '/v6', destination: '/orm/v6', permanent: true },
      { source: '/v6/orm', destination: '/orm/v6', permanent: true },
      { source: '/v6/orm/:path*', destination: '/orm/v6/:path*', permanent: true },
    ];
  },
};

export default withMDX(config);
