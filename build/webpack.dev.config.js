const path = require('path')
const webpack = require('webpack');

// webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// postcss 配置文件
const postcssConfig = path.resolve(__dirname, 'postcss.config.js');
// 生产构建输出目录
const outputDir = path.resolve(__dirname, '../dist');
// 项目业务代码根目录
const srcDir = path.resolve(__dirname, '../src');
// 插件集
const getPlugins = function() {
    const plugins = [
        new CleanWebpackPlugin(outputDir, { allowExternal: true }),
        new ProgressBarPlugin(),
        new ExtractTextPlugin('./css/index.css'),
    ];
    const glob = require('glob').Glob;
    const files = new glob("src/template/*.html", { sync: true });
    const filesArr = files.found;
    for (var key in filesArr) {
        name = filesArr[key].split('/').pop();
        var htmlPlugin = new HtmlWebpackPlugin({
            hash: true,
            filename: name,
            template: './template/' + name
        })
        plugins.push(htmlPlugin);
    }
    return plugins;
}

module.exports = {
    context: srcDir,
    entry: srcDir + '/js/webpack.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].[hash].app.js",
        hashDigestLength: 8
    },
    module: {
        rules: [{
                test: /\.less$/,
                include: [
                    srcDir
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: postcssConfig
                                }
                            }
                        },
                        { loader: 'less-loader' }
                    ],
                    publicPath: '../'
                })
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'underscore-template-loader',
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    plugins: getPlugins(),
    devServer: {
        contentBase: path.resolve(__dirname, "../dist"),
        port: 9001,
        open: true,
        index: 'index.html',
        inline: true,
        noInfo: true,
        // 将错误显示在html之上
        // overlay: true,
        overlay: true,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: 500
        }
    }
}