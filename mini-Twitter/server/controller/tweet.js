import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js'

export async function getTweets(req,res){
    
    const username = req.query.username;
    console.log(username,"유저네임");

    const data = await (username 
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll()
    )
    console.log(data);
    res.status(200).json(data)
}

export async function getTweet(req,res){
    const id = req.params.id;
    const data = await tweetRepository.getbyId(id);
    
    if(data){
        res.status(200).json(data);
    } else{
        res.status(404).json({message: `Tweet id: ${id} not found`});
    }
}

export async function createTweet(req,res){
    const {text} = req.body;
    const userId = req.userId;
    const tweet= await tweetRepository.create(text,userId)
    
    res.status(201).json(tweet);

    //새 트윗이 올라올때마다 broadcast
    getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req,res){
    const id = req.params.id;
    
    const text = req.body.text;
    

    const tweet = await tweetRepository.getbyId(id);
    console.log('tweet: ',tweet);
    console.log('userId:' ,tweet.userId);
    if (!tweet){
        console.log('에러1');
        return res.sendStatus(404)
    }
    if(tweet.userId !==req.userId){
        console.log('에러2');
        return res.sendStatus(403);
    }

    const updated = await tweetRepository.update(id,text)
    
    res.status(200).json(updated);
   
}

export async function deleteTweet(req,res){
    const id = req.params.id;

    const tweet = await tweetRepository.getbyId(id);
    
    if (!tweet){
        console.log('에러11')
        return res.sendStatus(404)
    }
    if(tweet.userId !==req.userId){
        console.log('에러22')
        return res.sendStatus(403);
    }

    await tweetRepository.remove(id);
    
    res.sendStatus(204);

    
}
