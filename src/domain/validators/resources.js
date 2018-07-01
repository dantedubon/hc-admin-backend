import { ResourcesValidator } from '../types/common';

export default class Resource implements ResourcesValidator {
  provinces: any;
  validationErrors: any;

  constructor({ provinces, validationErrors }) {
    this.provinces = provinces;
    this.validationErrors = validationErrors;
  }

  validateCityRequest(provinceId: Number): Array<string> { // eslint-disable-line class-methods-use-this
    console.log(provinceId);
    const errors: Array<string> = [];
    const provinceFound: any = this.provinces.find((province) => province.id === provinceId);

    if (provinceFound === undefined) {
      errors.push(this.validationErrors.resources.PROVINCE_NOT_FOUND);
    }

    return errors;
  }
}
