import "../css/index.css"
function sum(...args) {
    return args.reduce((a, b) => a + b, 0)
}


console.log(sum(1, 2, 3, 4, 5))
/**
 * ServiceWorker代码必须运行在服务器上
 *  1.写nodejs代码
 *  2.npm i serve -g 
 *      serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
if ('serviceWorker' in navigator) {
    window.addEventListener("load",()=>{
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log(
                    'ServiceWorker registration successful with scope: ',
                    registration.scope
                )
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err)
            })
    })
}