const process = require('process');

console.log(process.pid);
console.log(process.version);
console.log(process.execPath);

setTimeout(()=>{
    console.log('setTimeout');
},0);


//process의 nextTick
//태스크큐에 다른 콜백이 있어도 순서 무시하고, 큐 가장 앞으로 배치
process.nextTick(()=>{
    console.log('nextTick');
})

//for loop가 다 돌고 콜스택이 비었을때 등록한 콜백 실행한다.
for (let i=0;i<100;i++){
    console.log('for loop');
}