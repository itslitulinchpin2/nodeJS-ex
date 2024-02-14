//Fixed-size 메모리 덩어리가 버퍼이다.
//array of integers, byte of data

const buf = Buffer.from('Hi');
console.log(buf); //<Buffer 48 69>, 유니코드
console.log(buf.length);
console.log(buf[0]); //아스키 형태로 출력
console.log(buf[1]); //아스키 형태로 출력
console.log(buf.toString());

//create
const buf2 = Buffer.alloc(2);
const buf3 = Buffer.allocUnsafe(2); //초기화하지 않음

buf2[0]=72;
buf2[1]=105;
buf2.copy(buf3);
console.log(buf2.toString());
console.log(buf3);

//buffer: 문자가 됐든 숫자가 됐든 덩어리 형태, 바이트 단위로 처리


//concat : 버퍼 모으기
const newBuf = Buffer.concat([buf,buf2,buf3]);
console.log(newBuf.toString());
