import express from 'express';
import postRouter from './router/post.js'
import userRouter from './router/user.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use('/posts',postRouter)
app.use('/users',userRouter);
app.use(cors());
app.use(morgan('combined')); // 서버에 대한 정보를 콘솔로그를 찍지 않아도 출력
app.use(helmet()); // 보안에 필요한 헤더들을 추가해준다.

app.get('/',(req,res)=>{
    res.send('Welcome!');
})


//그 외 유용한 미들웨어들
app.use(express.json()); // REST API ->Body parsing할 때. 
app.use(express.urlencoded({extended: false})); //HTML Form -> Body로 파싱
app.use(express.static);

app.listen(8080);