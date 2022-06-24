const withPlugins = require('next-compose-plugins')



const nextConfig = {
  reactStrictMode: false,
}


module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};