import {db, sequelize} from '../db/database.js'
import * as userRepository from './auth.js';
import SQ from 'sequelize';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:false,
    }

})

//아래 한 줄 만으로 관계 정의가 가능하다.
Tweet.belongsTo(User);



// let tweets = [
//     {
//         id:'1',
//         text:"아 백엔드도 매우 어렵구나",
//         createdAt: new Date().toString(),
//         userId: '1'
//     },
//     {
//         id:'2',
//         text:"아 프론트엔드도 매우 어렵구나",
//         createdAt: new Date().toString(),
//         userId: '1'
//     }
// ];

const SELECT_JOIN = 'SELECT tw.id,tw.text,tw.createdAt, tw.userId, us.username,us.name,us.url  FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

const INCLUDE_USER = {
    attributes:[
        'id','text','createdAt','userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'),'username'],
        [Sequelize.col('user.url'),'url']
    ],
    include:{
        model:User,
        attributes:[]
    },
    order: [['createdAt', 'DESC']]
}

const ORDER_DESCENDING = {
    order: [['createdAt', 'DESC']]
}

export async function getAll(){
    // return Promise.all(
    //     tweets.map(async (tweet)=>{
    //         const {username, name, url} = await userRepository.findById(
    //             tweet.userId
    //         );
    //         return {...tweet,username,name,url}
    //     })
    // )

    // return db.execute(
    //     `${SELECT_JOIN} ${ORDER_DESC}`
    //     ).then((result)=>result[0]);

    return Tweet.findAll({
        ...INCLUDE_USER,...ORDER_DESCENDING 
    })
}

export async function getAllByUsername(username){
    
   //let array=[];

   //await getAll().then((tweets)=>{
    //console.log("시작");
    //console.log(tweets);
    //array = tweets.filter((tweet)=>tweet.username===username);
    //console.log(array);
    //console.log("끝")
   //})

   //return array;
    
    //filter는 조건에 맞는 것들을 모두 담아 배열로 반환
    
    
    // return db.execute(
    //     `${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]
    //     ).then((result)=>result[0]);

    return Tweet.findAll({
        ...INCLUDE_USER,
        ...ORDER_DESCENDING,
        include : {
            ...INCLUDE_USER.include,
             where:{username}
        }
    })
   
}

export async function getbyId(id){
    //find는 제일 먼저 조건에 맞는 객체 그 자체를 반환

    // const found = tweets.find((tweet)=>tweet.id===id);
    // if(!found){
    //     return null;
    // }
    // const {username,name,url} = await userRepository.findById(found.userId)
   
    // return {...found,username,name,url};

    // return db.execute(
    //     `${SELECT_JOIN} WHERE tw.id=?`, [id]
    // ).then((result)=>result[0][0]);

    return Tweet.findOne({
        where:{id},
        ...INCLUDE_USER,

    })
}

export async function create(text,userId){
    // const tweet = {
    //     id:Date.now().toString(),
    //     text,
    //     createdAt: new Date(),
    //     userId
    // }
    // tweets=[tweet, ...tweets];
    // return getbyId(tweet.id);


    // return db.execute(
    //     'INSERT INTO tweets (text, createdAt,userId) VALUES (?,?,?)',
    // [text,new Date(), userId]
    // ).then((result)=>getbyId(result[0].insertId))

    return Tweet.create({text,userId})
    .then(data=> this.getbyId(data.dataValues.id));
}

export async function update(id,text){
    // const tweet = tweets.find((t)=>t.id===id);
    // if (tweet){
    //     tweet.text=text;
    // } 
    // return getbyId(tweet.id); //tweet을 못찾으면 undefined return
    
    
    // return db.execute(
    //     'UPDATE tweets SET text=? WHERE id=?',
    //     [text,id]
    // ).then(()=>getbyId(id))

    return Tweet.findByPk(id, INCLUDE_USER)
    .then(tweet=>{
        tweet.text=text;
        return tweet.save();
    })

}

export async function remove(id){
    //tweets = tweets.filter(t=>t.id!==id);
    
    //return db.execute('DELETE FROM tweets WHERE id=?', [id]);

    return Tweet.findByPk(id)
    .then(tweet=>{
      tweet.destroy();
    })
}