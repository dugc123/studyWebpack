/*
    HMR:hot module replacement 热模块替换/模块热替换
        作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有）
        极大提升构建速度

    样式文件：可以使用HMR功能，因为style-loader内部实现了~
    js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
        注意：HMR功能对JS的处理，只能处理非入口文件的其他文件。
    html文件：默认不能使用HMR功能，同时会导致问题-->html文件不能热更新(不用做HMR功能)
        解决：修改entry入口，将html文件引入
 * 
 * 运行指令：
 * webpack  会将打包结果输出出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 */

const { resolve } = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
    entry: ['./src/js/index.js','./src/index.html'],
    output: {
        filename: 'js/built.js',//打包后的js文件,在js文件夹下面
        path: resolve(__dirname, "build")//打包文件夹
    },
    module: {
        rules: [
            //详细loader配置
            {
                test: /\.css$/,
                //使用哪些loader进行处理
                use: [
                    //use数组中的loader执行顺序：从右到左，从下到上一次执行
                    //创建style标签，将js中的样式资源插入进去,添加head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                //使用哪些loader进行处理
                use: [
                    //use数组中的loader执行顺序：从右到左，从下到上一次执行
                    //创建style标签，将js中的样式资源插入进去,添加head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容
                    'css-loader',
                    'less-loader'
                ]
            },
            //打包其他资源,exclude排除
            {
                exclude: /\.(css|js|html|jpg|png|gif|less)$/,
                loader: "file-loader",
                options:{
                    name:"[hash:10].[ext]",//使用前10位哈希值
                    outputPath:"media"
                }
            },
            {
                //问题：处理不了html中的图片
                test:/\.(jpg|png|gif)$/,
                //使用一个loader
                //下载url-loader file-loader
                loader:"url-loader",
                options:{
                    //图片小于20kb，就会被base64处理
                    limit:20*1024,
                    //给图片重命名
                    // name:"[name].[ext]",//使用原本的名字
                    name:"[hash:10].[ext]",//使用前10位哈希值
                    outputPath:"imgs"
                }
            },{
                test:/\.html$/,
                //处理HTML文件中的img图片（负责引入img,从而能被url-loader进行处理）
                loader:"html-loader"
            }
        ]
    },
    //plugins的配置
    plugins: [
        //详细plugin的配置
        //功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS)
        new htmlWebpackPlugin({
            //复制./src/index.html文件，并自动引入打包输出的所有资源
            template: './src/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
            filename: 'index.html'//打包后的html文件名称
        })
    ],
    //模式
    mode: "development",
    //mode:"production"

    //开发服务器devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：npx webpack-dev-server
    devServer: {
        //项目构建后的路径
        contentBase: resolve(__dirname, "build"),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HMR功能
        hot:true
    }
}