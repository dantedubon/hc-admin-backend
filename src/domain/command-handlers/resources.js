import Boom from 'boom';
import fs from 'fs';

import type { CommandHandler, Repository } from '../types/common';
import type { City, Province, Sector } from '../types/resources';
import { ResourcesValidator } from '../types/common';

export default class Resources implements CommandHandler {
  cities: any;
  provinces: Array<Province>
  repository: Repository;
  resourceValidator: ResourcesValidator;
  sectors: Array<Sector>;
  constructor({
    cities, ResourceValidator, provinces, sectors,
  }) {
    this.cities = cities;
    this.resourceValidator = ResourceValidator;
    this.provinces = provinces;
    this.sectors = sectors;
  }

  getAllCities(): Promise<any> { // eslint-disable-line class-methods-use-this
    return Promise.resolve(this.cities);
  }

  getCities({ provinceId }): Promise<Array<City>> { // eslint-disable-line class-methods-use-this
    const validationErrors: Array<string> = this.resourceValidator.validateCityRequest(provinceId);

    if (validationErrors.length > 0) {
      return Boom.badRequest(validationErrors);
    }

    return Promise.resolve(this.cities[provinceId.toString()]);
  }

  getProvinces(): Promise<Array<Province>> { // eslint-disable-line class-methods-use-this
    return Promise.resolve(this.provinces);
  }

  getSectors(): Promise<Array<Sector>> { // eslint-disable-line class-methods-use-this
    return Promise.resolve(this.sectors);
  }
}
