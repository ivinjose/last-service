const path = require("path");

module.exports = {
    context: path.join(__dirname, "src"),
    entry: ["./index.js"],
    output: {
        path: path.join(__dirname, "www"),
        filename: "bundle.js"
    },
    devtool: "sourcemap", // has to be removed in production
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.join(__dirname, "node_modules")],
        alias: {
            react: "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
    }
};
