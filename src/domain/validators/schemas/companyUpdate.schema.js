const Joi = require('joi');

export const CompanyUpdateModel = Joi.object({
  name: Joi.string().optional().description('Name'),
  description: Joi.string().optional().description('Description'),
  products: Joi.string().optional().description('Products'),
  sector: Joi.number().min(1).optional().description('Industrial sector'),
  province: Joi.number().min(1).optional().description('Province'),
  city: Joi.number().min(1).optional().description('City'),
  address: Joi.string().optional().description('Address'),
  branches: Joi.array().items(Joi.number()).optional().description('Branches'),
  email: Joi.string().email().optional().description('Email'),
  primaryPhoneNumber: Joi.string().optional().description('Primary phone number'),
  secondaryPhoneNumber: Joi.string().optional().description('Secondary phone number'),
  facebook: Joi.string().optional().description('Facebook'),
  instagram: Joi.string().optional().description('Instagram'),
  website: Joi.string().optional().description('Website url'),
  capitalPercentage: Joi.number().min(1).max(100).optional()
    .description('Capital percentage'),
  employeesPercentage: Joi.number().min(1).max(100).optional()
    .description('Employees percentage'),
  productivityPercentage: Joi.number().min(1).max(100).optional()
    .description('Productivity percentage'),
}).description('Json that describes a company object for registration');
