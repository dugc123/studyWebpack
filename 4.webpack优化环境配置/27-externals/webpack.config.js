/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-07 16:16:21
 */
const {resolve} = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    //webpack配置
    //入口起点
    entry:"./src/js/index.js",
    //输出
    output:{
        //输出文件名
        filename:"built.js",
        //输出路径
        path:resolve(__dirname,"build")
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
    mode:"production",
    externals:{
        //忽略库名 -- npm下载包名
        jquery:"jQuery"
    }
}