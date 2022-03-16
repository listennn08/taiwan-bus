const withPWA = require('next-pwa')
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const AutoImport = require('unplugin-auto-import/webpack')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // next/image need add image domain
  },
  env: {
    API_KEY: 'ten24bcf4362674a3435c934f9ef8b4470b91',
    API_SECRET: 'EwLWG1SgD9rAjMMv-Dsyc0Bskp8',
    BUS_API_PATH: 'https://ptx.transportdata.tw/MOTC/v2/Bus'
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
})
