const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	mode: 'production',
	optimization: {
		minimizer: [new CssMinimizerPlugin()]
	},
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'ink-spoiler.min.js'
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'ink-spoiler.min.css'
		})
	]
}
