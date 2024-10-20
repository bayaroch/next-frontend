const { override, addBabelPlugin } = require('customize-cra')

module.exports = override(
  addBabelPlugin('istanbul'),
  addBabelPlugin([
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@pages': './src/pages',
        '@theme': './src/theme',
        '@global': './src/global',
        '@services': './src/services',
        '@constants': './src/constants',
        '@layouts': './src/layouts',
        '@locales': './src/locales',
        '@containers': './src/containers',
        '@utils': './src/utils',
        '@store': './src/store',
      },
    },
  ])
)
