const Joi = require('joi');

export const newsRegisterModel = Joi.object({
  title: Joi.string()
    .optional()
    .description('title'),
  author: Joi.string()
    .optional()
    .description('author'),
  content: Joi.string()
    .optional()
    .description('content'),
}).description('Json that describes a news object for updating');
