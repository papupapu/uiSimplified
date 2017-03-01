const 	path 		= require('path'),
		webpack 	= require('webpack'),

		APP_DIR     = path.resolve(__dirname, 'src'),
		BUILD_DIR   = path.resolve(__dirname, 'public'),
		jsFolder 	= 'js/',
		cssFolder 	= 'style/';

module.exports = {

	context: APP_DIR,

	entry: {
		app: './index.jsx'
	},

	output: {
		path: BUILD_DIR,
		filename: jsFolder + '[name].bundle.js'
	},

	module: {

		rules: [
			{
				test	: /\.js$/,
				exclude	: [/node_modules/],
				use		: [{
					loader 	: 'babel-loader',
					options	: { presets: ['es2015'] }
				}]
			}
		]

	}

};

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