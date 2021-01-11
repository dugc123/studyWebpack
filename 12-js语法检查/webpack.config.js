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
        path:resolve(__dirname,"built")
    },
    module:{
        rules:[
            /**
             * 语法检查：eslint-loader eslint
             * 
             * 设置检查规则：
             * package.json中eslintConfig中设置
             *   "eslintConfig":{
                    "extends":"airbnb-base"
                }
             * sirbnb -->eslint-config-airbnb-base eslint eslint-plugin-import
             */
            {
                test:/\.js$/,
                loader:'eslint-loader',
                exclude:/node_modules/,
                options:{
                    //自动修复eslint的错误
                    fix:true
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