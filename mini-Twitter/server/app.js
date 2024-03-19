import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-error';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js'
import { config } from './config.js';
import { Server } from 'socket.io';
import {initSocket} from './connection/socket.js'
import {db, sequelize} from './db/database.js'
const app = express();

const corsOption = {
    origin:config.cors.allowedOrigin,
    optionsSuccessStatus:200
}

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors(corsOption));

app.use('/tweets', tweetsRouter);
app.use('/auth',authRouter);

app.use((req,res,next) => {
    res.sendStatus(404);
});

app.use((error,req,res,next) => {
    console.error(error);
    res.sendStatus(500);
})

sequelize.sync().then((client)=>{
    console.log(`Server started .... ${new Date()}`)
    const server = app.listen(config.port);
    initSocket(server);
})


// db.getConnection().then();
// const server = app.listen(config.host.port); //서버가 리턴된다
// initSocket(server);


// const socketIO = new Server(server, {
//     cors:{
//         origin:'*'
//     }
// }) //Server는 socket.io의 모듈
// socketIO.on('connection', (socket)=>{
//     console.log('Client is here!');
//     socketIO.emit('twitter', 'hello');
//     socketIO.emit('twitter', 'hi');

// })

// setInterval(()=>{
//     socketIO.emit('twitter', 'wesh');
// },1000);