const webpack = require('webpack');
const config = require('sapper/webpack/config.js');
const {style} = require('./lib.js')
const path = require('path')
const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.mjs', '.json', '.html']
	},
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
						hydratable: true,
						cascade: false,
						store: true,
						hotReload: true,
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
			},
		]
	},
	mode,
	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
