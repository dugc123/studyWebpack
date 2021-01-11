/*
 * @Autor: 杜庚辰
 * @Desc: webpack入口文件
 * @Date: 2021-01-07 10:22:15
 * 
 * 1.运行指令：
 * 开发环境：webpack ./src/index.js -o ./build/build.js --mode=development
 * webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js
 * 整体打包环境是开发环境
 * 生产环境：webpack ./src/index.js -o ./build/build.js --mode=production
 * webpack会以./src/index.js为入口文件开始打包，打包后输出到./build/build.js
 * 整体打包环境是生产环境
 */

function add(x,y){
    return x+y
}

console.log('add() :>> ', add(1,3));