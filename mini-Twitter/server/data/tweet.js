
import * as userRepository from './auth.js';
let tweets = [
    {
        id:'1',
        text:"아 백엔드도 매우 어렵구나",
        createdAt: new Date().toString(),
        userId: '1'
    },
    {
        id:'2',
        text:"아 프론트엔드도 매우 어렵구나",
        createdAt: new Date().toString(),
        userId: '1'
    }
];

export async function getAll(){
    return Promise.all(
        tweets.map(async (tweet)=>{
            const {username, name, url} = await userRepository.findById(
                tweet.userId
            );
            return {...tweet,username,name,url}
        })
    )
}

export async function getAllByUsername(username){

    return getAll().then((tweets)=>{
        tweets.filter((tweet)=>tweet.username===username);
    })
    //filter는 조건에 맞는 것들을 모두 담아 배열로 반환
   
}

export async function getbyId(id){
    //find는 제일 먼저 조건에 맞는 객체 그 자체를 반환
    const found = tweets.find((tweet)=>tweet.id===id);
    if(!found){
        return null;
    }
    const {username,name,url} = await userRepository.findById(found.userId)
    
    return {...found,username,name,url};
}

export async function create(text,userId){
    const tweet = {
        id:Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    }
    tweets=[tweet, ...tweets];
    return getbyId(tweet.id);
}

export async function update(id,text){
    const tweet = tweets.find((t)=>t.id===id);
    if (tweet){
        tweet.text=text;
    } 
    return getbyId(tweet.id); //tweet을 못찾으면 undefined return
}

export async function remove(id){
    tweets = tweets.filter(t=>t.id!==id);
}