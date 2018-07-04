const Joi = require('joi');

export const CompanySearchModel = Joi.object({
  province: Joi.number().required().description('Province'),
  sector: Joi.number().required().description('Sector'),
}).description('Json that describes a query object for searching');
