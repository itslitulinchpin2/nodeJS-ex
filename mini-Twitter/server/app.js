import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-error';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js'
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);
app.get('/', (req,res,next) => {
    res.status(200).json({message:'hi'});
});



app.listen(8080);