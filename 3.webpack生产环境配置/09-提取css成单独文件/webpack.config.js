/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-08 16:43:57
 */
const {resolve} = require("path")
const htmlWebpackPlugin  = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports={
    entry:"./src/js/index.js",
    output:{
        filename:"js/built.js",
        path:resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    //"style-loader",//创建style标签，将样式加入
                    miniCssExtractPlugin.loader,//这个loader取代style-loader。作用：提取js中的css成单独文件
                    "css-loader"//将css文件整合到js文件中
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html"
        }),
        new miniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename:"css/built.css"
        })
    ],
    mode:"development"
}