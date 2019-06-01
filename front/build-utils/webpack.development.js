const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
    plugins: [
      new HtmlWebpackPlugin({
        title: "test app",
        filename: "./index.html",
        template: "src/index.html",
        inject: "body",
        publicPath: '/'
    }),

    ],
    devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  }
})