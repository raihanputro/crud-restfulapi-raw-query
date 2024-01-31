const _ = require('lodash');

const fileName = 'server/helpers/itemHelper.js';

const { ConnectionPool, __constructQueryResult } = require('../services/database');

const getItemList = async () => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT * FROM item`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'Get ITEM LIST', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
};

const getItemListByAuthor = async (id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT A.*, B.username FROM item A LEFT JOIN user B ON A.author_id = B.id WHERE A.author_id = ${id}`);

        await conn.connection.release();

        const result = __constructQueryResult(query);

        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'Get ITEM LIST', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
};

const getDetailItem = async(id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        const query = await conn.query(`SELECT * FROM item WHERE id = ${id}`);
    
        await conn.connection.release();
    
        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);    
    } catch (error) {
        console.log([fileName, 'Get ITEM DETAIL', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const postDataItem = async(name, price, stock, authorid) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`INSERT INTO item (name, price, stock, author_id) VALUES('${name}', ${price}, ${stock}, ${authorid})`);

        const query = await conn.query(`SELECT * FROM item`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'post DATA ITEM', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const putDataItem = async(id, name, price, stock, authorid) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`UPDATE item SET name="${name}", price=${price}, stock=${stock}, author_id=${authorid} WHERE id = ${id}`);
    
        const query = await conn.query(`SELECT * FROM item`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'put DATA ITEM', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}

const deleteDataItem = async (id) => {
    try {
        const conn = await ConnectionPool.getConnection();

        await conn.query(`DELETE FROM item WHERE id=${id}`);

        const query = await conn.query(`SELECT * FROM item`);

        await conn.connection.release();

        const result = __constructQueryResult(query);
    
        return Promise.resolve(result);
    } catch (error) {
        console.log([fileName, 'delete DATA ITEM', 'ERROR'], { message: { info: `${error}` }});
        return Promise.resolve([]);
    }
}



module.exports = {
    getItemList,
    getItemListByAuthor,
    getDetailItem,
    postDataItem,
    putDataItem,
    deleteDataItem
  }