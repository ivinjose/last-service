const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["./index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.join(__dirname, "node_modules")]
    },
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.ts$|\.css$|\.html$/,
            minRatio: 0.8
        }) //Refer - https://medium.com/@rajaraodv/two-quick-ways-to-reduce-react-apps-size-in-production-82226605771a
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "typings-for-css-modules-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]",
                            namedExport: true,
                            camelCase: true
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
            }
        ]
    }
};
