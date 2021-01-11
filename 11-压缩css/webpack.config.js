/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2021-01-08 16:43:57
 */
const {resolve} = require("path")
const htmlWebpackPlugin  = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin  = require("optimize-css-assets-webpack-plugin")
//设置nodejs环境变量
// process.env.NODE_ENV = "development";
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
                    // "style-loader",//创建style标签，将样式加入
                    miniCssExtractPlugin.loader,//这个loader取代style-loader。作用：提取js中的css成单独文件
                    "css-loader",//将css文件整合到js文件中
                    /**
                     * css兼容性处理：postcss --> postcss-loader  postcss-preset-env
                     * 帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                     *   "browserslist":{
                     * //开发环境
                            "development":[
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            //生产环境，默认是看生产环境
                            "production":[
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                            ]
                        }
                     */
                    //使用loader的默认配置
                    //'postcss-loader'
                    //修改loader的配置
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                //postcss插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
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
        }),
        //压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode:"development"
}