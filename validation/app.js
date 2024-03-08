import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();

const validate = (req,res,next)=>{
    //valdationResult 또한 express-validator 라이브러리
    
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        next();
    }

    return res.status(400).json({message: errors.array() });
    
}
app.use(express.json());

//콜백은 여러개 등록 가능하므로,
//두번째 인자에서 express-validator 라이브러리를 사용
//여러 검사를 배열로 저장 가능
//체이닝이 가능하다!



app.post('/users',
        [
        body('name')
        .trim() //trim을 통해 혹시 모를 공백을 제거해서 요청을 보낸다.
        .notEmpty()
        .withMessage('이름을 입력해야햠')
        .isLength({min:2})
        .withMessage('이름은 두 글자 이상'), 

        body('age')
        .notEmpty()
        .isInt()
        .withMessage('나이를 정수로 입력해야함'),

        body('email')
        .isEmail()
        .withMessage('이메일을 입력해야함')
        .normalizeEmail(), //이메일 포맷에 맞도록

        body('job.name')
        .notEmpty(),

        validate
    ],
        (req,res,next) => {
    
        
        console.log(req.body);
        res.sendStatus(201);
    });

app.get('/:email',
    [
    param('email')
    .isEmail()
    .withMessage('이메일 포맷이 아님')
    ,validate
    ]
    ,(req,res,next) => {
        res.send('mail');
    });

app.listen(8080);