/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    domains: ["https://api.sashimeomeo.com:5000"],
  },
  env: {
    HOST_API: "https://api.sashimeomeo.com:5000",
  },
};

module.exports = nextConfig;
