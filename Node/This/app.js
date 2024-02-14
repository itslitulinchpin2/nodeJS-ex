//함수 안에서 this를 호출하면 global이다.

function hello(){
    console.log(this); //gloabl
    console.log(this===global); //true
}
hello();

//클래스에서 this는 자기 자신을 가리킨다.

class A {
    constructor(num){
        this.num=num;
    }
    memberFunction(){
        console.log('class-------')
        console.log(this); //클래스 자기 자신을 가리킴
        console.log(this===global);//false
    }
}

const a = new A(1);
a.memberFunction();

console.log('global scope-------');
console.log(this); //global은 아님!
console.log(this===module.exports);