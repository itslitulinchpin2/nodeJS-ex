import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

//콜백은 여러개 등록 가능하므로,
//두번째 인자에서 express-validator 라이브러리를 사용
//여러 검사를 배열로 저장 가능
//체이닝이 가능하다!

app.post('/users',
        [
        body('name')
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
        .withMessage('이메일을 입력해야함'),

        body('job.name')
        .notEmpty()
    ],
        (req,res,next) => {
    
        //valdationResult 또한 express-validator 라이브러리
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message: errors.array() });
        }
        console.log(req.body);
        res.sendStatus(201);
    });

app.get('/:email',
    param('email')
    .isEmail()
    .withMessage('이메일을 입력해야함')
    ,(req,res,next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //return 쓰는거 깜빡해선 안됨!
            return res.status(400).json({message:errors.array()})
        }
        res.send('mail');
    });

app.listen(8080);