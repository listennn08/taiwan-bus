const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const AutoImport = require('unplugin-auto-import/webpack')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // next/image need add image domain
  },
  env: {
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    BUS_API_PATH: process.env.BUS_API_PATH,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    config.plugins.push(new WindiCSSWebpackPlugin())
    config.plugins.push(AutoImport({
      imports: [
        'react',
        {
          'react-router-dom': [
            'useHistory',
            'useRouteMatch',
            'useLocation',
          ],
          'react-redux': [
            'useSelector',
            'useDispatch',
          ],
          'axios': [
            ['default', 'axios'],
          ],
        },
      ],
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx'
        })
      ],
    }))
    config.plugins.push(Icons({
      compiler: 'jsx',
      jsx: 'react',
    }))

    return config
  },
}