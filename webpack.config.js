const path = require('path');
const webpack = require('webpack');
const copy = require('copy-webpack-plugin');


module.exports = {

	entry: './index.js',

	output: {

		filename: '[name].js',

		path: path.resolve( __dirname, 'dist' ),

		libraryTarget: 'umd'

	},

	resolve: {
		alias: {
			// 'node_modules': path.resolve(__dirname, './node_modules'),
			'@': path.resolve(__dirname, './src')
		}
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin(
			{
				compress: { warnings: false }
			}
		),
		new copy(
			[
				{
					from: path.resolve( __dirname, 'src/less/' ),
					to: path.resolve( __dirname, 'dist/less/' ),
					force: true
				}
			]
		)
	],

	module: {

		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: { preserveWhitespace: true }
				},
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[ 'env', { 'modules': false } ],
							'stage-0'
						],
					},
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]

	},

	externals : {
		vue : {
			root: 'Vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue'
		}
	}
};
