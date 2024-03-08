
let tweets = [
    {
        id:'1',
        text:"아 백엔드도 매우 어렵구나",
        createdAt: Date.now().toString(),
        name:'Lee',
        username:'lee',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    },
    {
        id:'2',
        text:"아 프론트엔드도 매우 어렵구나",
        createdAt: Date.now().toString(),
        name:'Kim',
        username:'kim',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
    }
];

export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter((tweet)=>tweet.username===username)
}

export async function getbyId(id){
    return tweets.find((tweet)=>tweet.id===id)
}

export async function create(text,name,username){
    const tweet = {
        id:Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets=[tweet, ...tweets];
    return tweet;
}

export async function update(id,text){
    const tweet = tweets.find((t)=>t.id===id);
    if (tweet){
        tweet.text=text;
    } 
    return tweet; //tweet을 못찾으면 undefined return
}

export async function remove(id){
    tweets = tweets.filter(t=>t.id!==id);
}