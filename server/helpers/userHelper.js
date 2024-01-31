const _ = require('lodash');

const fileName = 'server/helpers/userhelper.js';

const { ConnectionPool, __constructQueryResult } = require('../services/database');
const { responseSuccess, responseError }= require('../helpers/responseHelper')

const getUserList = async () => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT * FROM user`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'Get USER LIST', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
};

const getDetailUser = async(id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT * FROM user WHERE id = ${id}`);
    
        await conn.connection.release();
    
        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);    
    } catch (error) {
        console.log([fileName, 'Get USER DETAIL', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const postDataUser = async(email, password, username, address, phone, role) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`INSERT INTO user (email, password, username, address, phone, role) VALUES('${email}', '${password}', '${username}', '${address}', '${phone}', '${role}')`);
    
        const query = await conn.query(`SELECT * FROM user`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'post DATA USER', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const putDataUser = async(id, email, password, username, address, phone, role) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`UPDATE user SET email="${email}", password="${password}", username="${username}", address="${address}", phone="${phone}", role="${role}" WHERE id = ${id}`);
    
        const query = await conn.query(`SELECT * FROM user`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'put DATA USER', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const deleteDataUser = async (id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`DELETE FROM user WHERE id=${id}`);

        const query = await conn.query(`SELECT * FROM user`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'delete DATA USER', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}



module.exports = {
    getUserList,
    getDetailUser,
    postDataUser,
    putDataUser,
    deleteDataUser
  }