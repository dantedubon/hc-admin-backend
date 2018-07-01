const Joi = require('joi');

export const CityModel = Joi.object({
  provinceId: Joi.number()
    .required()
    .description('Province Id'),
}).description('Json that describes an request for city');
