const Router = require('express').Router();

const cartHelper = require('../helpers/cartHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, cartDataValidation } = require('../helpers/validationHelper');

const list = async ( req, res ) => {
    try {
        const response = await cartHelper.getCartList();

        return responseSuccess(res, 200, 'Success get cart list', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get cart list');
    }
};

const add = async ( req, res ) => {
    try {
        cartDataValidation(req.body);
        const { item_id, user_id, qty } = req.body;

        const response = await cartHelper.postDataCart(item_id, user_id, qty);

        return responseSuccess(res, 200, 'Success post cart data', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot add cart');
    }
};

const update = async ( req, res ) => {
    try {
        idValidation(req.params);
        cartDataValidation(req.body);

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
Router.post('/add', add);
Router.put('/update/:id', update);
Router.delete('/delete/:id', remove);

module.exports = Router;