import Mongoose from 'mongoose';
import {config} from '../config.js'


export async function connectDB(){
    return Mongoose.connect(config.db.host);
   
}

export  function useVirtualId(userSchema){
    //_id -> id
    userSchema.virtual('id').get(function(){
        return this._id.toString();
    });
    userSchema.set('toJson', {virtuals:true})
    userSchema.set('toObject',{virtual:true})
}

let db;
export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}