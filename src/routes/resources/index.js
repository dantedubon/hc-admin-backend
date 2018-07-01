/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';
import { EncounterModel } from '../../domain/validators/encounter.schema';

import type { Command } from '../../domain/types/resources';

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
        method: 'GET',
        path: '/resources/provinces',
        handler: (request, h) =>
          dispatch({
            type: 'getProvinces',
          }),
        options: {
          tags: ['api'],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/resources/provinces/{provinceId}/cities',
        handler: (request, h) =>
          dispatch({
            type: 'getCities',
            provinceId: request.params.provinceId,
          }),
        options: {
          tags: ['api'],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/resources/sectors',
        handler: (request, h) =>
          dispatch({
            type: 'getSectors',
          }),
        options: {
          tags: ['api'],
          auth: false,
        },
      },
    ]);
  },
};
