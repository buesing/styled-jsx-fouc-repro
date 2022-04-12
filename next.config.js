/* eslint @typescript-eslint/no-var-requires: "off" */
const styledJsxLoader = require('styled-jsx/webpack')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  async headers() {
    return [
      process.env.NODE_ENV !== 'development' && {
        source: '/:all*(woff2|woff|svg|png|jpg|jpeg)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ].filter(Boolean)
  },
  webpack(config, options) {
    // remove .svg from next-image-loader
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'))
    fileLoaderRule.exclude = /\.svg$/

    // Perform customizations to webpack config
    config.module.rules.push({
      test: /\.css$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: styledJsxLoader.loader,
          options: {
            type: fileName =>
              fileName.toLowerCase().indexOf('global') === -1 ? 'scoped' : 'global',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'removeDimensions',
              ],
            },
          },
        },
      ],
    })
    return config
  },
})
