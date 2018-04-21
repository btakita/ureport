const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');
const {style} = require('./lib.js')
const path = require('path')
module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.mjs', '.json', '.html']
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		rules: [
			{
				test: /\.(js|mjs|html|svelte)$/,
        loaders: 'buble-loader',
        include: path.join(__dirname, '../__'),
        options: {
          objectAssign: 'Object.assign',
          transforms: {
            dangerousTaggedTemplateString: true
          },
        },
      },
			{
				test: /\.(js|mjs|html|svelte)$/,
        loader: 'nodent-loader',
        exclude: /(app|node_modules)/,
        query: {
          sourcemap: true,
          promises: true,
          noRuntime: true
        }
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						css: false,
						cascade: false,
						store: true,
						generate: 'ssr',
						parser: 'v2',
						preprocess: {
							style
						}
					}
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
						}
					}
				]
			}
		]
	},
	mode: process.env.NODE_ENV,
	performance: {
		hints: false // it doesn't matter if server.js is large
	}
};