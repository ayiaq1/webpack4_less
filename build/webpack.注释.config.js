/*
 * @Author: jiangyan
 * @Date:   2018-07-17 15:00:42
 * @Last Modified by:   jiangyan
 * @Last Modified time: 2018-07-26 17:58:39
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
    /*
        path模块
        Node.js path 模块提供了一些用于处理文件路径的小工具， 
        var path = require("path")
        path.normalize(p)；规范化路径，注意'..' 和 '.'。
        path.join([path1][, path2][, ...])；用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
        path.resolve([from ...], to)将 to 参数解析为绝对路径。
        path.isAbsolute(path)；判断参数 path 是否是绝对路径。
        path.resolve(from, to)；用于将相对路径转为绝对路径。
        path.dirname(p);返回路径中代表文件夹的部分，同 Unix 的dirname 命令类似。
        path.basename(p[, ext]);返回路径中的最后一部分。同 Unix 命令 bashname 类似。
        path.extname(p);返回路径中文件的后缀名，即路径中最后一个'.'之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.' 且这个'.'为路径的第一个字符，则此命令返回空字符串。
        path.parse(pathString)返回路径字符串的对象。
        path.format(pathObject);从对象中返回路径字符串，和 path.parse 相反。
    */
console.log('---------------path start-------------');
// path.join 用于连接路径
console.log('path.join:', path.join('/test1', 'test2', '/test3/test4'));
// 用于将相对路径转为绝对路径
console.log('path.resolve:', path.resolve('test.js'));
// 获取打包文件绝对路径
console.log('获取打包文件静态资源绝对路径:', path.resolve(__dirname, '../../static/dist'));
// 文件的后缀名 .js
console.log('path.extname:', path.extname('test.js'));
console.log('---------------path end-------------');



console.log('---------------__dirname start-------------');
// __dirname 表示当前文件所在的目录的绝对路径
console.log('__dirname', __dirname);
//  __filename 表示当前文件的绝对路径
console.log('__filename', __filename);
console.log('---------------__dirname start-------------');
console.log('---------------__dirname end-------------');


console.log('---------------占位符 start-------------');
// filename: "[name].[hash].app.js",
console.log('---------------占位符 end-------------');


/*
    webpack-merge
    var merge = require('webpack-merge')
    module.exports = merge(baseWebpackConfig, {
    
    }
    可扩展的 webpack 配置”是指，可重用并且可以与其他配置组合使用。
    这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离
    然后使用专门的工具（如 webpack-merge）将它们合并
*/
/* 占位符
[hash] 模块标识符(module identifier)的 hash
[chunkhash]chunk 内容的 hash
[name] 模块名称
[id] 模块标识符(module identifier)
[query]  模块的 query，例如，文件名 ? 后面的字符串
eg:
    filename: "[name].[hash].bundle.js"
*/
/* config1 多页面应用
    在多页应用中，（译注：每当页面跳转时）服务器将为你获取一个新的 HTML 文档。
    页面重新加载新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事：
    使用 CommonsChunkPlugin 
    为每个页面间的应用程序共享代码创建 bundle。
    由于入口起点增多，多页应用能够复用入口起点之间的大量代码/模块，
    从而可以极大地从这些技术中受益。
    entry:{
        pageone:'.src/page1/index.js',
        pagetwo:'.src/page2/index.js'
    }
    output：filename 用于输出文件的文件名。目标输出目录 path 的绝对路径。
    entry:string|Array

*/
/* clean-webpack-plugin 清除打包文件夹中多余的js文件

*/
/* mode 模式
    提供 mode 配置选项，告知 webpack 使用相应模式的内置优化
    development：会将 process.env.NODE_ENV 的值设为 development。
        启用 NamedChunksPlugin 和 NamedModulesPlugin。
    production：将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, 
    FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, 
    OccurrenceOrderPlugin, 
    SideEffectsFlagPlugin 和 UglifyJsPlugin.

*/
/*loader
loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。
loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，
或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！

loader 支持链式传递。能够对资源使用流水线(pipeline)。
一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。
在最后一个 loader，返回 webpack 所预期的 JavaScript。

在你的应用程序中，有三种使用 loader 的方式：
配置（推荐）：在 webpack.config.js 文件中指定 loader。
内联：在每个 import 语句中显式指定 loader。使用 ! 将资源中的 loader 分开
    import Styles from 'style-loader!css-loader?modules!./styles.css';
CLI：在 shell 命令中指定它们。
    webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
*/

/* 插件
    插件目的在于解决 loader 无法实现的其他事。
*/
/* 插件 HtmlWebpackPlugin
    new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'head',
            minify: {
                removeAttributeQuotes: true // 移除属性的引号
            },
            chunks: ['index','main']
     })
     title：生成html文件的标题
     filename：就是html文件的文件名，默认是index.html
     template：指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等。
     但是要注意的是，如果想使用自定义的模板文件的时候，你需要安装对应的loader哦。

    inject有四个值： true body head false
        true 默认值，script标签位于html文件的 body 底部
        body script标签位于html文件的 body 底部
        head script标签位于html文件的 head中
        false 不插入生成的js文件，这个几乎不会用到的

    favicon: 'path/to/my_favicon.ico' 给你生成的html文件生成一个 favicon ,值是一个路径

    然后再生成的html中就有了一个 link 标签 <link rel="shortcut icon" href="example.ico">
    minify：使用minify会对生成的html文件进行压缩

    cache: 默认是true的，表示内容变化的时候生成一个新的文件。

    chunks:chunks主要用于多入口文件，当你有多个入口文件(entry中配置)，那就回编译后生成多个打包后的文件，
    那么chunks 就能选择你要使用那些js文件;
        chunks: ['index','main']对应entry:{ index:'',main:'' }
        会在页面中引入两个js文件,index.js和main.js


*/
/*模块
在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为_模块_。
    ES2015 import 语句
    CommonJS require() 语句
    AMD define 和 require 语句
    css/sass/less 文件中的 @import 语句。
    样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)
*/
/* 模块热替换
    模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。
    主要是通过以下几种方式，来显著加快开发速度：
       保留在完全重新加载页面时丢失的应用程序状态。
        只更新变更内容，以节省宝贵的开发时间。
        调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。
*/
/* DevServer 
在开发模式下，DevServer 提供虚拟服务器，让我们进行开发和调试。
而且提供实时重新加载。

*/

/*
webpack --config ./build/webpack.dev.config.js
webpack-dev-server --config ./build/webpack.dev.config.js
weback的环境一般有三种：放在build下，webpack.base|dev|prod.conf.js

像progress，watch，env这样的参数一共有94个
webpack --progress true --watch true --env prod

服务器打包的后的文件并没有物理存在电脑上，只是在内存中，
*/
/* npm 内有一些默认的脚本比如： install/build/start

"scripts": {
    "prebuild": "rm -rf dist",
    "build": "webpack --progress --colors --hot",
    "postbuild": "echo \" delete dist and re webpack success\"",
    "start": "webpack-dev-server --progress --colors  --inline --hot --history-api-fallback"
},

rm -rf linux命令
*/

/* webpack 打包前删除文件夹

*/
let fs = require('fs'); //无需安装，直接使用
let emptyDir = function (fileUrl) {
    let files = fs.readdirSync(fileUrl);//读取该文件夹
    files.forEach(function (file) {
        let stats = fs.statSync(fileUrl + '/' + file);
        if (stats.isDirectory()) {
            emptyDir(fileUrl + '/' + file);
        } else {
            fs.unlinkSync(fileUrl + '/' + file);
            console.log("删除文件:" + fileUrl + '/' + file + "成功");
        }
    });
};
emptyDir('dist');

const config1 = {
    entry: {
        page1: './src/test1.js',
        page2: './src/test2.js'
    },
    output: {
        filename: '[name]22.js', // name指的是上一层的app和vendors
        path: path.resolve(__dirname, '../dist'),
    },
}
/* config2 普通单页面应用
 */
const config2 = {
    entry: './test.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
}
const config3 = {
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.js'
    },
    resolve: {
        //extensions扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@src': path.resolve('src')
        }
    },
    devServer: {
        // progress 只能在命令行用，不在配置文件中配
        // 网站的根目录为 根目录/dist，如果没有指定，使用process.cwd()函数取当前工作目录，工作目录>npm run dev
        contentBase: path.resolve(__dirname, '../dist/'),
        port: 9000,
        // 自动打开浏览器
        open: true,
        // 与HtmlWebpackPlugin中配置filename一样
        index: 'index.html',
        // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
        inline: true,
        hot: false,
        // 它与output.publicPath的值应该是一样的，值为上面contentBase目录的子目录，是放js,css,图片等资源的文件夹，记得打包时，将图片等拷贝或打包到该文件下
        publicPath: '/static/',
        //压缩
        compress: true
    },
    // 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视
    watch: true
}


module.exports = {
    entry: config1.entry,
    output: config1.output,
    // 通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化
    mode: 'production',
    module: {
        rules: [{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    devServer: {
        clientLogLevel: 'warning',
        // 如果为 true ，页面出错不会弹出 404 页面。
        historyApiFallback: true,
        /*
        热模块更新作用。即修改或模块后，保存会自动更新，页面不用刷新呈现最新的效
        这不是和 webpack.HotModuleReplacementPlugin （HMR） 这个插件不是一样功能吗？
        是的，不过请注意了，HMR 这个插件是真正实现热模块更新的。而 devServer 里配置了 hot: true , 
        webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
        */
        hot: true,
        // 如果为 true ，开启虚拟服务器时，为你的代码进行压缩。加快开发流程和优化的作用。
        compress: true,
        host: 'localhost',
        port: 8084,
        // true，则自动打开浏览器。
        open: true,
        watchOptions: {
            //一旦第一个文件改变，在重建之前添加一个延迟。填以毫秒为单位的数字。
            aggregateTimeout: 300,
            // 填以毫秒为单位的数字。每隔（你设定的）多少时间查一下有没有文件改动过。不想启用也可以填false。
            poll: 1000,
            // 观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹
            ignored: /node_modules/
        },
        // contentBase:path.join(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            hash: true,
            title: '这是自动生成的一个html文件',
            filename: './html/index1.html',
            template: './study.html'
        }),
        new HtmlWebpackPlugin({
            title: '这是自动生成的第二个html文件',
            filename: './html/index2.html',
            template: './study.html'
        }),
    ]
}