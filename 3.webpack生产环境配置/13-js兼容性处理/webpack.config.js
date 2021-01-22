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
    module:{
        rules:[
            /**
             * js兼容性处理：babel-loader @babel/preset-env @babel/core
             * 1.基本js兼容性处理 --->@babel/preset-env
             *  问题：只能转化基本语法，如promise高级语法不能转换
             * 2.全部js兼容处理  --->babel-polyfill  已舍弃
             *  问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
             * 3.需要做兼容性处理做：按需加载  -->core-js
             */
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    //预设：指示babel做怎么样的兼容性处理
                        presets:[
                            [
                                "@babel/preset-env",
                                {
                                    //按需加载
                                    useBuiltIns:"usage",
                                    //指定core-js版本
                                    corejs:{
                                        version:3
                                    },
                                    //指定兼容性做到哪个版本的浏览器
                                    targets:{
                                        chrome:"60",
                                        firefox:"60",
                                        ie:'7',
                                        safari:'8',
                                        edge:'10'
                                    }
                                }
                            ]
                        ]
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    mode:"development"
}