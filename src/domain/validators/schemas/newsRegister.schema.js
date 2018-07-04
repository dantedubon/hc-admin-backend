const Joi = require('joi');

export const newsRegisterModel = Joi.object({
  title: Joi.string()
    .required()
    .description('title'),
  author: Joi.string()
    .required()
    .description('author'),
  content: Joi.string()
    .required()
    .description('content'),
}).description('Json that describes a news object for registration');
