console.log('logging...');
console.clear();

//log level
console.log('log'); //개발시
console.info('info'); //정보
console.warn('warn'); //경보
console.error('error'); //에러, 사용자, 시스템 에러

//assert : 참이 아닌 경우에만 출력
console.assert(2===3, 'not same'); //얘만 출력됨
console.assert(2===2, 'same'); 

//print object
const student = { name: 'lee', age: 20};
console.log(student);
console.table(student); //table형태로 출력

//console.type
//console.dir

//trace
function f1(){
    f2();
}
function f2(){
    f3();
}
function f3(){
    console.log('f3');
    console.trace(); //누가 호출했는지 추적할 때에 유용
}
f1();