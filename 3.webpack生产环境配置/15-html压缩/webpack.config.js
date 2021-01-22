/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-11 15:56:00
 */
const {resolve} = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin");


module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/built.js",
        path:resolve(__dirname,"build")
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html",
            minify:{
                //折叠空格
                collapseWhitespace:true,
                //删除注释
                removeComments:true
            }
        })
    ],
    //生产环境下自动压缩js代码
    mode:"development"
}