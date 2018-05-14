const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["./index.js"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.join(__dirname, "node_modules")],
        alias: {
            react: "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    plugins: [
        new UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
