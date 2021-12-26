const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // next/image need add image domain
  },
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    config.plugins.push(AutoImport({
      imports: ['react']
    }))
    return config
  },
}
