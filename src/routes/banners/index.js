/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';

import { CompanyRegisterModel } from '../../domain/validators/schemas/companyRegister.schema';
import { CompanySearchModel } from '../../domain/validators/schemas/companySearch.schema';
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
        path: '/banners',

        handler: (request, h) =>
          dispatch({
            type: 'createBanner',
            data: request.payload,
          }),
        options: {
          tags: ['api'],
          auth: false,
          payload: {
            output: 'stream',
            allow: 'multipart/form-data', // important
            maxBytes: 1000 * 1000 * 3,
          },
        },
      },
      {
        method: 'GET',
        path: '/banners',
        handler: (request, h) =>
          dispatch({
            type: 'getAllBanners',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'DELETE',
        path: '/banners/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'deleteBanner',
            data: Object.assign({}, request.payload, request.params),
          }),

        options: {
          auth: false,
          tags: ['api'],
          validate: {
            params: {
              id: Joi.required(),
            },
          },
        },
      },

      {
        method: 'PUT',
        path: '/banners/order',
        handler: (request, h) =>
          dispatch({
            type: 'updateBannersOrder',
            data: request.payload,
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
    ]);
  },
};
