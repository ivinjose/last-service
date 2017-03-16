const path = require('path');
 
module.exports = {
	context: path.join(__dirname, 'src/components'),
	entry: [
		'./index.js',
	],
	output: {
		path: path.join(__dirname, 'www'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ 'babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader'],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]___[hash:base64:5]'	
						}
					}
				]
			},
		],
	},
	resolve: {
		modules: [
			path.join(__dirname, 'node_modules'),
		],
	},
};