// next.config.js
module.exports = {
  images: {
    domains: ["cdn.shopify.com"],
  },
  eslint: {
    // Build ke dauran ESLint errors ko ignore karen
    ignoreDuringBuilds: true,
  },
};
