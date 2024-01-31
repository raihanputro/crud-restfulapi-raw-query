const Router = require('express').Router();
const _ = require('lodash');

const userHelper = require('../helpers/userHelper');
const { responseSuccess, responseError } = require('../helpers/responseHelper');
const { idValidation, userDataValidation } = require('../helpers/validationHelper');

const list = async ( req, res ) => {
    try {
        const response = await userHelper.getUserList();

        return responseSuccess(res, 200, 'Success get user list', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get user list');
    }
};

const detail = async ( req, res ) => {
    try {
        idValidation(req.params);

        const getId = req.params['id'];

        const response = await userHelper.getDetailUser(getId);

        if(_.isEmpty(response)) {
            return responseError(res, 404, 'Cannot find user');
        }

        return responseSuccess(res, 200, 'Success get user detail', response);
    } catch (error) {
        return responseError(res, 404, 'Cannot get user detail');
    }
};

const add = async ( req, res ) => {
    try {
        userDataValidation(req.body);

        const { email, password, username, address, phone, role } = req.body;

        const response = await userHelper.postDataUser(email, password, username, address, phone, role);

        return responseSuccess(res, 200, 'Success post data user', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot add user');
    }
};

const update = async ( req, res ) => {
    try {

        idValidation(req.params);
        userDataValidation(req.body);

        const id = parseInt(req.params['id']);

        const { email, password, username, address, phone, role } = req.body;

        const response = await userHelper.putDataUser(id, email, password, username, address, phone, role);

        return responseSuccess(res, 200, 'Success put data user', response);
    } catch (error) {
        return responseError(res, 400, 'Cannot update user');
    }
};

const remove = async ( req, res ) => {
    try {
        idValidation(req.params);

        const id = parseInt(req.params['id']);

        const checkAccount = await userHelper.getDetailUser(id);

        if(_.isEmpty(checkAccount)) {
            return responseError(res, 404, 'Cannot find user');
        } 

        const response = await userHelper.deleteDataUser(id);

        return responseSuccess(res, 200, 'Success delete data user', response);

    } catch (error) {
        return responseError(res, 400, 'Cannot delete user');
    }
}


Router.get('/', list);
Router.get('/:id', detail);
Router.post('/add', add);
Router.put('/update/:id', update);
Router.delete('/delete/:id', remove);

module.exports = Router;