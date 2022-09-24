const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	entry: {
		index: "./src/self/ts/index.ts",
		options: "./src/self/ts/options.ts",
		options_style: "./src/self/ts/options_style.ts"
	},
	output: {
		path: __dirname + "/src/gen/",
		filename: "[name].bundle.js"
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [{ loader: "ts-loader" }]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]"
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	],
	devtool: "source-map"
};