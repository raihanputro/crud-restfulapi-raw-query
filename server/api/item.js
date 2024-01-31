const Router = require('express').Router();

const itemHelper = require('../helpers/itemHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, itemDataValidation } = require('../helpers/validationHelper');


const list = async ( req, res ) => {
    try {
        const response = await itemHelper.getItemList();

        return responseSuccess(res, 200, 'Success get item list', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get item list');
    }
};

const listByAuthor = async ( req, res ) => {
    try {
        const id = parseInt(req.params['idAuthor']);

        const response = await itemHelper.getItemListByAuthor(id);

        return responseSuccess(res, 200, 'Success get item list by that author', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get item list by that author');
    }
};

const detail = async ( req, res ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const response = await itemHelper.getDetailItem(id);
    
        return responseSuccess(res, 200, 'Success get iten detail', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get item list');
    }
};

const add = async ( req, res ) => {
    try {
        itemDataValidation(req.body);

        const { name, price, stock, authorid } = req.body;

        const response = await itemHelper.postDataItem(name, price, stock, authorid);

        return responseSuccess(res, 200, 'Success post item data', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot add item');
    }
};

const update = async ( req, res ) => {
    try {
        idValidation(req.params);
        itemDataValidation(req.body);

        const id = parseInt(req.params['id']);
        const { name, price, stock, authorid } = req.body;

        const response = await itemHelper.putDataItem(id, name, price, stock, authorid);

        return responseSuccess(res, 200, 'Success put data item', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot update item');
    }
};

const remove = async ( req, res ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const response = await itemHelper.deleteDataItem(id);

        return responseSuccess(res, 200, 'Success delete data item', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot delete item');
    }
}


Router.get('/', list);
Router.get('/author/:idAuthor', listByAuthor);
Router.get('/:id', detail); 
Router.post('/add', add);
Router.put('/update/:id', update);
Router.delete('/delete/:id', remove);

module.exports = Router;