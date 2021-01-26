const {resolve} = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
/**
 * entry:入口起点
 *  1.string -->"./src/index.js"
 *      单入口
 *      打包形成一个chunk.输出一个bundle文件；
 *  2.array -->["./src/index.js","./src/add.js"]
 *      多入口
 *      所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
 *      --->只有在HMR功能中让html热更新生效~
 *  3.object
 *  {
        index:"./src/index.js",
        add:"./src/add.js"
    }
 *      多入口
 *      有几个入口文件就会形成几个chunk，输出几个bundle文件
 *      此时chunk的名称就是key
 * 
 *      -->特殊用法
*              {    
                    //所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
                    index:["./src/index.js","./src/count.js"],
                    //形成一个chunk,输出一个bundle文件；
                    add:"./src/add.js"
                }
 */
module.exports={
    entry:{
        index:"./src/index.js",
        add:"./src/add.js"
    },
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'build')
    },
    plugins:[
        new htmlWebpackPlugin()
    ],
    mode:"development"
}