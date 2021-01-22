const {resolve} = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    //webpack配置
    //入口起点
    entry:"./src/index.js",
    //输出
    output:{
        //输出文件名
        filename:"built.js",
        //输出路径
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            //详细loader配置
            {
                test:/\.css$/,
                //使用哪些loader进行处理
                use:[
                    //use数组中的loader执行顺序：从右到左，从下到上一次执行
                    //创建style标签，将js中的样式资源插入进去,添加head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容
                    'css-loader'
                ]
            },
            //打包其他资源,exclude排除
            {
                exclude:/\.(css|js|html)$/,
                loader:"file-loader"
            }
        ]
    },
    //plugins的配置
    plugins:[
        //详细plugin的配置
        //功能：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS)
        new htmlWebpackPlugin({
            //复制./src/index.html文件，并自动引入打包输出的所有资源
            template: './src/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
        })
    ],
    //模式
    mode:"development",
    //mode:"production"
}