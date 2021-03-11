const path = require('path');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';

module.exports = Object.assign({
    mode: 'development',
    context: path.join(__dirname, 'src/client/components'),
    entry: [
        'webpack-hot-middleware/client?quiet=true',
        '@babel/polyfill',
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'www'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.(jpeg|png|gif|svg|jpg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images'
                }
            }

        ],
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    devtool: 'inline-sourcemap', // has to be removed in production
    watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}, 
// Production web pack setup
isProd ? {
    mode: 'production',
    entry: [
        '@babel/polyfill',
        './index.js',
    ],
    devtool: 'nosources-source-map',
    plugins: [],
    watch: false,
} : {});
