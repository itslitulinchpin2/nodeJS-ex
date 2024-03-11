const jwt = require('jsonwebtoken');

//payload, secretKey
const token = jwt.sign({
    id:'userId',
    isAdmin: true
}, 'secretkey',
    {expiresIn: 2} //jwt가 몇 초 만에 소멸되게 할 것인가
    //특정시간이 지나면 jwt가 expire되도록 함
    );

console.log(token);

//jwt.verify()를 통해 토큰의 악의적 변경 유무 알 수 있음
