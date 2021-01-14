
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
        new htmlWebpackPlugin({
            template: './src/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
            filename: 'index.html'//打包后的html文件名称
        })
    ],
    mode: "development",
    devServer: {
        contentBase: resolve(__dirname, "build"),
        compress: true,
        port: 3000,
        open: true,
        hot:true
    },
    devtool:"eval-source-map"
}
/**
 * source-map:一种提供源代码到构建后代码映射技术（如果构建后代码出错，通过映射可以追踪源代码错误）
 * 
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * source-map:外部
 *  错误代码准确信息和源代码的错误位置
 * 
 * inline-source-map：内联
 *  1.只生成一个内联source-map
 *  错误代码准确信息和源代码的错误位置
 * 
 * hidden-source-map：外部
 *  错误代码的错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的错误位置
 * 
 * eval-source-map：内联
 *  1.每一个文件都生成对应的source-map,都在eval
 *  错误代码准确信息和源代码的错误位置
 * 
 * nosources-source-map:外部
 *  错误代码准确信息，但是没有任何源代码信息
 * cheap-source-map:外部
 *  错误代码准确信息和源代码的错误位置
 *  只能精确到行
 * cheap-module-source-map:外部
 *  错误代码准确信息和源代码的错误位置
 * module会将loader的source map 加入
 * 内联和外部的区别：1.外部生成了文件，内联没有生成  2.内联构建速度更快
 * 
 * 
 * 开发环境：速度快，调试更友好
 *  速度快（eval>inline>cheap>...）
 *   eval-cheap-souce-map
 *   eval-source-map
 *  调试更友好
 *   souce-map
 *   cheap-module-source-map
 *   cheap-source-map
 * 
 * 最优方案：eval-source-map/eval-cheap-module-source-map
 * 
 * 
 * 生产环境：源代码要不要隐藏？调试要不要更友好
 *  内联会让代码体积变大，所以在生产环境不用内联
 *  nosources-source-map  全部隐藏
 *  hidden-source-map   只隐藏源代码，会提示构建后代码错误信息
 * 最优方案：source-map/cheap-module-source-map
 */ 
