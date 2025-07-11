import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["mdx", "js", "jsx"],
  experimental: {
    mdxRs: true,
  },
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "www.americanexpress.com",
      "images.unsplash.com",
      "store.storeimages.cdn-apple.com",
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
