const path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["./index.js"],
    output: {
        path: path.join(__dirname, "www"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/"
                        }
                    }
                ]

                // loaders: [
                //     'file-loader',
                //     'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                // ],
                // options: {
                //     name: '[name].[ext]',
                //     outputPath: 'images/'
                // }
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, "node_modules")]
    },
    devtool: "inline-sourcemap" // has to be removed in production
};
