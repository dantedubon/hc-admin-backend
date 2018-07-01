/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';

import type { Command } from '../../domain/types/encounter';

const headersValidation = Joi.object({
  authorization: Joi.string(),
}).options({ allowUnknown: true });

exports.default = {
  pkg: Pack,
  register: async (server: Object, options: Object) => {
    const dispatch = (cmd: Command) =>
      new Promise((resolve) => {
        server.app.dispatcher.dispatch(cmd).subscribe((response) => {
          resolve(response);
        });
      });
    server.route([
      {
        method: 'POST',
        path: '/companies',
        handler: (request, h) =>
          dispatch({
            type: 'createCompany',
            data: request.payload,
          }),
        options: {
          tags: ['api'],
          auth: 'jwt',
          validate: {
            headers: headersValidation,
            payload: {
              name: Joi.string().required(),
              description: Joi.string().required(),
              products: Joi.string().required(),
              sectorId: Joi.number().min(1).required(),
              provinceId: Joi.number().min(1).required(),
              cityId: Joi.number().min(1).required(),
              address: Joi.string().required(),
              doesCompanyHaveBranches: Joi.boolean().required(),
              branches: Joi.array().items(Joi.number()).required(),
              email: Joi.string().email().required(),
              primaryPhoneNumber: Joi.string().required(),
              secondaryPhoneNumber: Joi.string().optional(),
              facebook: Joi.string().optional(),
              instagram: Joi.string().optional(),
              website: Joi.string().optional(),
              capitalPercentage: Joi.number().min(1).max(100).required(),
              employeesPercentage: Joi.number().min(1).max(100).required(),
              productivityPercentage: Joi.number().min(1).max(100).required(),
            },
          },
        },
      },
    ]);
  },
};
