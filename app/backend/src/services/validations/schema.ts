import * as Joi from 'joi';

const schema = {
  password: Joi.string().min(8).required(),
};

export default schema;
