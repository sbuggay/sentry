var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: "./src/index",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	devtool: "source-map",
	resolve: {
		extensions: ["*", ".ts", ".tsx", ".js", ".jsx"]
	},
	module: {
		// rules: [
		// 	{
		// 		test: /\.tsx?$/,
		// 		enforce: "pre",
		// 		loader: "tslint-loader",
		// 		options: {}
		// 	}
		// ],
		loaders: [
			{
				test: /\.jsx?/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
				exclude: /node_modules/
			},

		]
	}
};