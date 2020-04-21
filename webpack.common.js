const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/')
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'style.css',
  }), new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,

        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,

        use: [
          'vue-loader',
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/colors.scss', './src/styles/mixins.scss']
            },
          },
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ]
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
    }
    ]
  }
}