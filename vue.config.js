const webpack = require('webpack');
var path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'windows.jQuery': 'jquery'
			})
		],
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'@': resolve('src'),
				'/components': resolve('src/components'),
				'/page': resolve('src/page'),
				'/common': resolve('src/common'),
				'/assets': resolve('src/assets'),
				// '@/api': resolve('@@/api'),
				'/utils': resolve('src/utils')
			}
		}
	},
	runtimeCompiler: true
}