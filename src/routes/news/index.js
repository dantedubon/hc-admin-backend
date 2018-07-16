/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';
import { newsRegisterModel } from '../../domain/validators/schemas/newsRegister.schema';
import { newsUpdateModel } from '../../domain/validators/schemas/newsUpdate.schema';

const headersValidation = Joi.object({
  authorization: Joi.string(),
}).options({ allowUnknown: true });

exports.default = {
  pkg: Pack,
  register: async (server, options) => {
    const dispatch = (cmd) =>
      new Promise((resolve) => {
        server.app.dispatcher.dispatch(cmd).subscribe((response) => {
          resolve(response);
        });
      });
    server.route([
      {
        method: 'POST',
        path: '/news',
        handler: (request, h) =>
          dispatch({
            type: 'createNews',
            data: request.payload,
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            payload: newsRegisterModel,
          },
        },
      },
      {
        method: 'PUT',
        path: '/news/{id}/images',
        handler: (request, h) =>
          dispatch({
            type: 'updateNewsImage',
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
        path: '/news/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'updateNews',
            data: Object.assign({}, request.payload, request.params),
          }),
        options: {
          tags: ['api'],
          auth: false,
          validate: {
            params: {
              id: Joi.number().required(),
            },
            payload: newsUpdateModel,
          },
        },
      },
      {
        method: 'GET',
        path: '/news',
        handler: (request, h) =>
          dispatch({
            type: 'getAllNews',
          }),

        options: {
          auth: false,
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/news/deleted/{id}',
        handler: (request, h) =>
          dispatch({
            type: 'deleteNews',
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
        path: '/news/{id}/image',
        handler: (request, h) =>
          dispatch({
            type: 'getNewsImage',
            data: request.params,
          }).then((newsImage) => {
            const response = h.response(newsImage);
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
    ]);
  },
};
