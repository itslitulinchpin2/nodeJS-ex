import mysql from 'mysql2';
import {config} from '../config.js'
import SQ from 'sequelize';

const {host,user,database,password} = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect:'mysql',
    logging:false //코딩시에는 켜두는게 좋을듯
})

const pool = mysql.createPool({
    host:config.db.host,
    user:config.db.user,
    database:config.db.database,
    password:config.db.password

})

export const db = pool.promise();