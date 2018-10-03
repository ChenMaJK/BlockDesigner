const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'development',
	entry: {
		index: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [ 'es2015', 'stage-0', 'react' ]
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true
							// importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [ require('autoprefixer') /*在这里添加*/ ]
						}
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true
							// importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [ require('autoprefixer') /*在这里添加*/ ]
						}
					},
					{
						loader: require.resolve('less-loader'), // compiles Less to CSS
						options: {
							modules: true,
							localIdentName: '[name]-[local]-[hash:base64:5]'
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/, //图片的处理
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 500, //当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
							outputPath: 'image/', // 指定打包后的图片位置
							name: '[name].[ext]?[hash]' //name:'[path][name].[ext]
						}
					}
				]
			},
			{
				test: /\.(swf|ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
				loader: 'file'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:9090/webpack-dev-server/'
		}),
		// new BundleAnalyzerPlugin(),
	],
	resolve: {
		alias: {
			Base: path.resolve(__dirname, '../src/Components/Base/'),
			HOC: path.resolve(__dirname, '../src/Components/HOC/'),
			Icon: path.resolve(__dirname, '../src/Components/Icon/'),
			Unity: path.resolve(__dirname, '../src/Components/Unity/'),
			Layout: path.resolve(__dirname, '../src/Components/Layout/'),
			View: path.resolve(__dirname, '../src/View/')
		},
		extensions: [ '.js', '.json', '.png' ]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					// chunks:"initial",
					test: /node_modules/,
					name: 'vendors',
					priority: -20,
					chunks: 'all'
				},
				components: {
					// chunks:"initial",
					test: /components/,
					name: 'components',
					priority: -19,
					chunks: 'all'
				}
			}
		}
	},

	devtool: 'inline-source-map'
};
