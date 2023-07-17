const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sharedConfig = require('./webpack.shared.config.js')

const clientPort = 3000
const devMode = process.env.NODE_ENV !== 'production'

const config = {
    target: 'web',

    entry: './src/index.js',

    output: {
        path: path.join(__dirname, './build/client'), // [A]
        filename: 'scripts/bundle.js', // [B]
        publicPath: `http://localhost:${clientPort}/`,
    },

    devServer: {
        port: clientPort,
        liveReload: true,
    },

    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          exportLocalsConvention: 'camelCase',
                          localIdentName: '[local]_[hash:base64:5]',
                      },
                  },
                }
              ],
            },
            {
              test: /\.scss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          exportLocalsConvention: 'camelCase',
                          localIdentName: '[local]_[hash:base64:5]',
                      },
                  },
                },
                'sass-loader'
              ],
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: 'svg-url-loader',
                  options: {
                    limit: 10000,
                  },
                },
              ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/bundle.css', // [C]
        }),
    ],
}

module.exports = merge(sharedConfig, config)