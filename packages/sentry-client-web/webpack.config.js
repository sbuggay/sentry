var path = require("path");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                enforce: "pre",
                loader: "tslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    }
};