const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { from:  path.resolve(__dirname, 'src/assets/sounds'),
        to: path.resolve(__dirname, 'dist/assets/sounds', '[name][ext]')},
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sass|css|scss)$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          'group-css-media-queries-loader',
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: 'asset/resource',
        generator: {
        filename: '[path]/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif)$/i,
        use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
        generator: {
        filename: '[path]/[name][ext]',
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path]/[name][ext]',
          },
      },
      {
        test: /\.ico$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
          },
      },
      {
        test: /\mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: '[path]/[name][ext]',
          },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
}
