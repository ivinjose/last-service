const path = require('path');

module.exports = {
    mode: 'production',
    context: path.join(__dirname, 'src/client/components'),
    entry: [
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
                    outputPath: '/images/'
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
};
