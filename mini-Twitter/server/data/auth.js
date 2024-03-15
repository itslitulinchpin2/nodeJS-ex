import { getUsers } from '../db/database.js';
import MongoDB from 'mongodb';

export async function findByUsername(username){
    return getUsers()
        .findOne({username})
        .then(mapOptionalUser)
}

export async function createUser(user){
   return getUsers()
    .insertOne(user)
    .then(data=>data.insertedId.toString())
}

export async function findById(id){
    return getUsers()
        .findOne({_id:new MongoDB.ObjectId(id)})
        .then( mapOptionalUser)
   
}

function mapOptionalUser(user){
    return user ? {...user, id: user._id} : user;
}
