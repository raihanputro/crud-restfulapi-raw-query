const Joi = require("joi");
const Boom = require("boom");

const idValidation = ( data ) => {
    const schema = Joi.object({
        id: Joi.number().integer().required().description('User id; i.e. 1, 2, 3, ...')
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const userDataValidation = ( data ) => {
    const schema = Joi.object({
        email: Joi.string().email().required().description('email; i.e. user@mail.com ...'),
        password: Joi.string.require().description('password; i.e. User12345'),
        username: Joi.string.require(),
        address: Joi.string.require(),
        phone: Joi.string.require(),
        role: Joi.string.require()
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const itemDataValidation = ( data ) => {
    const schema = Joi.object({
        name: Joi.string.require(),
        price: Joi.number.require(),
        stock: Joi.number.require(),
        authorid: Joi.number.require(),
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

const cartDataValidation = ( data ) => {
    const schema = Joi.object({
        item_id: Joi.number.require(),
        user_id: Joi.number.require(),
        qty: Joi.number.require()
      });
    
      if (schema.validate(data).error) {
        throw Boom.badRequest(schema.validate(data).error);
      }
};

module.exports = {
   idValidation,
   userDataValidation,
   itemDataValidation,
   cartDataValidation
  };