/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**.myanimelist.net",
          },
        ],
      },
};

module.exports = nextConfig;
