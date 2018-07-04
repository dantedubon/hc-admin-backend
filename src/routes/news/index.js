/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';
import { newsRegisterModel } from '../../domain/validators/schemas/newsRegister.schema';

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
    ]);
  },
};
