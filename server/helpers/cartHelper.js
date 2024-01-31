const _ = require('lodash');

const fileName = 'server/helpers/itemHelper.js';

const { ConnectionPool, __constructQueryResult } = require('../services/database');
const { responseSuccess, responseError }= require('../helpers/responseHelper')

const getCartList = async () => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT A.id, B.name AS item, C.username AS customer, A.qty as quantity FROM cart A INNER JOIN item B ON A.item_id=B.id INNER JOIN user C ON B.author_id=C.id`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'Get CART LIST', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
};

const postDataCart = async(itemId, userId, qty) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`INSERT INTO cart (item_id, user_id, qty) VALUES('${itemId}', ${userId}, ${qty})`);

        const query = await conn.query(`SELECT A.id, B.name AS item, C.username AS customer, A.qty as quantity FROM cart A INNER JOIN item B ON A.item_id=B.id INNER JOIN user C ON B.author_id=C.id`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);

    } catch (error) {
        console.log([fileName, 'post DATA ITEM', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const putDataCart = async(id, itemId, userId, qty) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`UPDATE cart SET item_id=${itemId}, user_id=${userId}, qty=${qty} WHERE id = ${id}`);
    
        const query = await conn.query(`SELECT A.id, B.name AS item, C.username AS customer, A.qty as quantity FROM cart A INNER JOIN item B ON A.item_id=B.id INNER JOIN user C ON B.author_id=C.id`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'put DATA CART', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const deleteDataCart = async (id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`DELETE FROM cart WHERE id=${id}`);

        const query = await conn.query(`SELECT A.id, B.name AS item, C.username AS customer, A.qty as quantity FROM cart A INNER JOIN item B ON A.item_id=B.id INNER JOIN user C ON B.author_id=C.id`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'delete DATA CART', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}



module.exports = {
    getCartList,
    postDataCart,
    putDataCart,
    deleteDataCart
  }