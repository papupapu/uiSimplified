const 	path 				= require('path'),
		webpack 			= require('webpack'),
		ExtractTextPlugin 	= require('extract-text-webpack-plugin'),

		APP_DIR     		= path.resolve(__dirname, 'src'),
		BUILD_DIR   		= path.resolve(__dirname, 'public'),
		jsFolder 			= 'js/',
		cssFolder 			= 'style/';

module.exports = {

	context: APP_DIR,

	entry: {
		app: './browser/index.jsx'
	},

	output: {
		path 		: BUILD_DIR,
		filename 	: jsFolder + '[name].bundle.js'
	},

	module: {

		rules: [
		
			{
				test    : /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader  : 'url-loader?limit=100000'
			},

			{
				test	: /\.css$/,
				loader 	: ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1'
				})
			},

			{
				test	: /\.jsx$/,
				exclude	: [/node_modules/],
				use		: [{
					loader 	: 'babel-loader',
					options	: { presets: ['react','es2015'] }
				}]
			}

		]

	},

	resolve: {

	    extensions: [
	      '.js',
	      '.jsx',
	      '.css'
	    ],

	},	

	plugins: [
		new ExtractTextPlugin({
			filename	: cssFolder + '[name].bundle.css',
			allChunks 	: true
		})
	]

};

process.noDeprecation = true;


/*

	Multiple files output

		entry: {
			tpl1: './tpl1.jsx',
			tpl2: './tpl2.jsx',
			tpl3: './tpl3.jsx'
		}

		- avoids packing the same dipendencies more than once if WebPack tries to load them twice

		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name 		: 'commons',
				filename	: 'commons.js',
				minChunks	: 2
			})
		]	



*/