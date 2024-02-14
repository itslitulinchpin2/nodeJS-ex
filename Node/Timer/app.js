
let num = 1;

//특정한 간격별로 일정한 일을 실행하도록.
const interval = setInterval(()=>{
    console.log(num++);
},1000);

setTimeout(()=>{
    console.log('time out!');

    //interval을 멈춤.
    clearInterval(interval);
},6000);
