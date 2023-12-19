/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [{ source: "/", destination: "/sign-in", permanent:true }];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
    ],
  },
};

module.exports = nextConfig;
