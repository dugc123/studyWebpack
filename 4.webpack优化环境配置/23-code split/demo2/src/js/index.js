import $ from "jquery";

function sum(...args){
    return args.reduce((a,b)=>a+b,0)
}

console.log('$ :>> ', $);
console.log(sum(1,2,3,4,5))