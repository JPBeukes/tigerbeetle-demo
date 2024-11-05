/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Only handle the native module on the server side
    if (isServer) {
      config.externals.push({
        "tigerbeetle-node": "commonjs tigerbeetle-node",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
