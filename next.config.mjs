import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "js", "jsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: [
      "store.storeimages.cdn-apple.com",
      "www.americanexpress.com",
      "lh3.googleusercontent.com",
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
