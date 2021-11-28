import path from 'path'
import React from '@vitejs/plugin-react'
import SSR from 'vite-plugin-ssr/plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import WindiCSS from 'vite-plugin-windicss'
import { UserConfig } from 'vite'
import { readdirSync } from 'fs'
import { readFile } from 'fs/promises'

const customCollections = {
  custom: [...readdirSync('./assets/icons')].reduce((acc, file) => {
    if (path.extname(file) !== '.svg') return acc
    const [name] = file.split('.')
    return {
      ...acc,
      [name]: () => readFile(path.resolve('./assets/icons', file), 'utf-8'),
    }
  }, {})
}

const config: UserConfig = {
  resolve: {
    alias: {
      '@/': `${__dirname}/`,
      '#/': `${path.resolve(__dirname, 'apollo')}/`,
    }
  },
  plugins: [
    React(),
    SSR(),
    WindiCSS(),
    AutoImport({
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
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      customCollections,
    })
  ],
};

export default config;
