const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    app: ['./src/main.ts']
  },
  output: {
    filename: 'index.js',
    path: `${__dirname}/app`,
    publicPath: '/app/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production'
          }
        }
      })
    ]
  },
  devtool: 'source-map'
};
