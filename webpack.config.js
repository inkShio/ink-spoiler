const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const fs = require('fs-extra');
const Path = require('path');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	const plugins = [
		// Этот плагин будет выполнен после того, как Webpack сгенерирует все файлы.
		{
			apply: (compiler) => {
				compiler.hooks.afterEmit.tap('CopyDistToDocsPlugin', (compilation) => {
					const sourcePath = Path.resolve(__dirname, 'dist');
					const destinationPath = Path.resolve(__dirname, 'docs');

					// Используем fs-extra для надежного копирования директории
					fs.copy(sourcePath, destinationPath, {
						filter: (src) => !src.endsWith('.map') // Не копируем source-map файлы
					}, err => {
						if (err) {
							return console.error(err);
						}
						console.log('Successfully copied dist to docs!');
					});
				});
			},
		},
	];

	// Для продакшн сборки добавляем плагин для извлечения CSS
	if (isProduction) {
		plugins.push(new MiniCssExtractPlugin({
			filename: 'ink-spoiler.css'
		}));
	}

	return {
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? false : 'eval-source-map',
		watchOptions: {
			ignored: /node_modules|docs/,
		},
		devServer: {
			static: './docs',
			port: 9000,
		},
		stats: {
			children: true,
		},
		entry: {
			main: './src/index.js'
		},
		output: {
			filename: 'ink-spoiler.js',
			path: Path.resolve(__dirname, 'dist'),
			clean: true, // Очищаем папку dist перед каждой сборкой
		},
		optimization: {
			minimize: isProduction,
			minimizer: [
				`...`, // Включаем стандартный JS минимизатор (Terser)
				new CssMinimizerPlugin(), // Включаем CSS минимизатор
			],
		},
		plugins: plugins,
		module: {
			rules: [
				{
					test: /\.m?js$/i,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.(c|sa|sc)ss$/i,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // В dev-режиме стили встраиваются в JS
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [require('postcss-preset-env')],
								},
							},
						},
						'sass-loader',
					],
				},
			]
		}
	};
};
