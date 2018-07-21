/* eslint-disable no-unused-vars */
import Joi from 'joi';
import Pack from './package.json';
import { CityModel } from '../../domain/validators/schemas/city.schema';

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
          validate: {
            params: CityModel,
          },
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
      {
        method: 'GET',
        path: '/resources/cities',
        handler: (request, h) =>
          dispatch({
            type: 'getAllCities',
          }),
        options: {
          tags: ['api'],
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/resources/kit.zip',
        handler: (request, h) => {
          return h.file(`${__dirname}/../../data/static/KIT HECHO EN CASA.zip`)
        },
        options: {
          tags: ['api'],
          auth: false,
        },
      },
    ]);
  },
};
