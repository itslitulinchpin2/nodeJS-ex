const fs = require('fs'); //얘는 노드 모듈이구나!

console.log(global);

global.hello = ()=>{
    console.log('hello');
}
global.hello();
hello();