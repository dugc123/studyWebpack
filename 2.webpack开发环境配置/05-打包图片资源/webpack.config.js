/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-07 21:23:37
 */
const {resolve} = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
module.exports ={
    entry:"./src/index.js",
    output:{
        filename:"built.js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            //详细loader配置
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    //将less编译成css文件
                    'less-loader',
                ]
            },{
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
                    name:"[hash:10].[ext]"//使用前10位哈希值
                }
            },{
                test:/\.html$/,
                //处理HTML文件中的img图片（负责引入img,从而能被url-loader进行处理）
                loader:"html-loader"
            }
        ]
    },
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
}