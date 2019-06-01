const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const postcssConfig = require('./postcss.config');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const PROD = 'production';
const NODE_ENV = process.env.NODE_ENV || PROD;

// eslint-disable-next-line
const modeConfig = env => require(`./build-utils/webpack.${env}.js`)(env);

module.exports = ({ mode } = { mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            mode,
            entry: ['./src/entry'],
            output: {
                filename: 'main_bundle.min.js',
                chunkFilename: '[name].bundle.js',
                path: path.resolve(__dirname, 'dist'),
            },
            resolve: {
                alias: {
                    Components: path.join(__dirname, 'src/components'),
                    Elements$: path.join(
                        __dirname,
                        'src/components/elements/index.ts'
                    ),
                    Services: path.join(__dirname, 'src/services'),
                    Constants$: path.join(__dirname, 'src/constants.ts'),
                    Models$: path.join(__dirname, 'src/models.ts'),
                },
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|js)x?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.svg|ico|png|gif|jpg($|\?)/,
                        use: [
                            {
                                loader: 'url-loader',
                            },
                        ],
                    },
                    {
                        test: /\.eot|ttf|woff|woff2($|\?)/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[ext]',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        loaders: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: postcssConfig,
                            },
                        ],
                    },
                ],
            },
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'initial',
                            name: 'vendor',
                            test: 'vendor',
                            enforce: true,
                        },
                    },
                },
            },
            plugins: [
                new CleanWebpackPlugin(['dist']),
                new webpack.EnvironmentPlugin({ NODE_ENV }),
                new webpack.ProgressPlugin(),
                new ForkTsCheckerWebpackPlugin(),
            ],

            // externals: {
            //     react: 'React',
            //     reactDOM: 'ReactDOM',
            // },
        },
        modeConfig(mode)
    );
};
