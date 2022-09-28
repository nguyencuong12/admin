/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify:false,
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    domains: ["http://api.sashimeomeo.com", "localhost", "api.sashimeomeo.com","cf.shopee.vn","https://salt.tikicdn.com"],
  },
  env: {
    // HOST_API: "https://api.sashimeomeo.com",
    // HOST_API: "http://api.sashimeomeo.com",
    HOST_API: "http://localhost:5000",
  },
};

module.exports = nextConfig;
