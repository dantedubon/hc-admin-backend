const Joi = require('joi');

export const CompanyRegisterModel = Joi.object({
  name: Joi.string().required().description('Name'),
  description: Joi.string().required().description('Description'),
  products: Joi.string().required().description('Products'),
  sector: Joi.number().min(1).required().description('Industrial sector'),
  province: Joi.number().min(1).optional().description('Province'),
  city: Joi.number().min(1).optional().description('City'),
  address: Joi.string().optional().description('Address'),
  branches: Joi.array().items(Joi.number()).required().description('Branches'),
  email: Joi.string().email().required().description('Email'),
  primaryPhoneNumber: Joi.string().required().description('Primary phone number'),
  isPrimaryPhoneNumberInWhatsapp: Joi.boolean().required().description('Primary phone number whatsapp'),
  secondaryPhoneNumber: Joi.string().optional().description('Secondary phone number'),
  isSecondaryPhoneNumberInWhatsapp: Joi.boolean().optional().description('Secondary phone number whatsapp'),
  facebook: Joi.string().optional().description('Facebook'),
  instagram: Joi.string().optional().description('Instagram'),
  website: Joi.string().optional().description('Website url'),
  capitalPercentage: Joi.number().min(1).max(100).required()
    .description('Capital percentage'),
  employeesPercentage: Joi.number().min(1).max(100).required()
    .description('Employees percentage'),
  productivityPercentage: Joi.number().min(1).max(100).required()
    .description('Productivity percentage'),
}).description('Json that describes a company object for registration');
