/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';

import { CompanyRegisterModel } from '../../domain/validators/schemas/companyRegister.schema';
import { CompanyUpdateModel } from '../../domain/validators/schemas/companyUpdate.schema';
import { Command } from '../../domain/types/encounter';

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
          auth: false,
          validate: {
            payload: CompanyRegisterModel,
          },
        },
      },
      {
        method: 'PUT',
        path: '/companies/{id}/images',
        handler: (request, h) =>
          dispatch({
            type: 'updateCompanyImage',
            imageInformation: Object.assign({}, request.payload, request.params),
          }),

        options: {
          tags: ['api'],
          auth: false,
          payload: {
            output: 'stream',
            allow: 'multipart/form-data', // important
          },
          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      },
      {
        method: 'PUT',
        path: '/companies/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'updateCompany',
            data: Object.assign({}, request.payload, request.params),
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            params: {
              id: Joi.number().required(),
            },
            payload: CompanyUpdateModel,
          },
        },
      },
      {
        method: 'GET',
        path: '/companies',
        handler: (request, h) =>
          dispatch({
            type: 'getAllCompanies',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/companies/accepted',
        handler: (request, h) =>
          dispatch({
            type: 'getAllAcceptedRequests',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/companies/accepted/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'acceptCompanyRequest',
            data: request.params,
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      },
      {
        method: 'POST',
        path: '/companies/denied/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'denyCompanyRequest',
            data: request.params,
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      },
      {
        method: 'GET',
        path: '/companies/{id}/image',
        handler: (request, h) =>
          dispatch({
            type: 'getCompanyImage',
            data: request.params,
          }).then((companyImage) => {
            const response = h.response(companyImage);
            response.type('image/jpeg');
            return response;
          }),

        options: {
          auth: false,
          tags: ['api'],

          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      },
      {
        method: 'POST',
        path: '/companies/deleted/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'deleteCompanyRequest',
            data: request.params,
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            params: {
              id: Joi.number().required(),
            },
          },
        },
      },
      {
        method: 'GET',
        path: '/companies/denied',
        handler: (request, h) =>
          dispatch({
            type: 'getAllDeniedRequests',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/companies/pending',
        handler: (request, h) =>
          dispatch({
            type: 'getAllPendingRequests',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/companies/deleted',
        handler: (request, h) =>
          dispatch({
            type: 'getAllDeletedRequests',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
    ]);
  },
};
