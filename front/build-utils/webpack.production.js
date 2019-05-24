const ZipPlugin = require('zip-webpack-plugin');

module.exports = () => ({
    plugins: [new ZipPlugin({ filename: 'bundle.zip' })],
})
