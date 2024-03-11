const bcrypt = require('bcrypt')

const password = 'abcd1234';

//두번째 인자는 salt의 길이
const hashed = bcrypt.hashSync(password, 10);

console.log(password)
console.log(hashed) //$2b$10$Z/DQs8WPMZExZ72vAGb7rO/DV0Lg9HXa.NX2aRlRN7Pdu7fpOH7tC

//salt가 증가할수록 해싱 시간은 기하급수적으로 증가한다.

const result = bcrypt.compareSync('abcd1234',hashed);
console.log(result);