import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-error';
import tweetsRouter from './router/tweets.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', tweetsRouter);


let tweets=[
    
];



app.get('/tweets', (req,res)=>{
    
    console.log(typeof(tweets));
    tweets=JSON.stringify(tweets);
    res.send(tweets);
    
})

app.post('/tweets', (req,res)=>{
    console.log('hi');
    console.log(req.body);
    tweets.push(req.body);
    res.send(tweets);

    });

app.use((req,res,next)=>{
res.sendStatus(404);}
)

app.use((error, req,res,next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(8080);