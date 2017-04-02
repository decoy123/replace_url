const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/self/ts/index.ts", 
		options: "./src/self/ts/options.ts",
		options_style: "./src/self/ts/options_style.ts"
	},
	output: {
		path: "./src/gen/",
		filename: "[name].bundle.js"
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "ts-loader"
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.png$/,
				loader: "file-loader?name=[name].[ext]"
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("[name].bundle.css")
	],
	devtool: "source-map"
};