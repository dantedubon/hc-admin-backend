import type { ResourcesValidator, Sector } from '../types/resources';
import type { CompanyEntity } from '../types/company';

export default class Resource implements ResourcesValidator {
  cities: Object;
  provinces: any;
  sectors: Array<Sector>;
  validationErrors: any;

  constructor({
    cities,
    provinces,
    sectors,
    validationErrors,
  }) {
    this.cities = cities;
    this.provinces = provinces;
    this.sectors = sectors;
    this.validationErrors = validationErrors;
  }

  validateCityRequest(provinceId: Number): Array<string> { // eslint-disable-line class-methods-use-this
    const errors: Array<string> = [];
    const provinceFound: any = this.provinces.find((province) => province.id === provinceId);

    if (provinceFound === undefined) {
      errors.push(this.validationErrors.resources.PROVINCE_NOT_FOUND);
    }

    return errors;
  }

  validateCityForCreation(company: CompanyEntity, errors: Array<string>): Array<string> {
    const citiesKeys = Object.keys(this.cities);

    const keyWhereCityExists = citiesKeys.find((key) => {
      const cityFound: any = this.cities[key].find((city) => city.id === company.city);
      return cityFound !== undefined;
    });

    if (keyWhereCityExists === undefined) {
      errors.push(this.validationErrors.resources.CITY_NOT_FOUND);
    }

    return errors;
  }
  validateCityForUpdate(company: CompanyEntity, errors: Array<string>): Array<string> {
    if (company.city === undefined && company.city === null) {
      return errors;
    }

    const citiesKeys = Object.keys(this.cities);

    const keyWhereCityExists = citiesKeys.find((key) => {
      const cityFound: any = this.cities[key].find((city) => city.id === company.city);
      return cityFound !== undefined;
    });

    if (keyWhereCityExists === undefined) {
      errors.push(this.validationErrors.resources.CITY_NOT_FOUND);
    }

    return errors;
  }
  validateProvinceForCreation(company: CompanyEntity, errors: Array<string>): Array<string> {
    const provinceFound: any = this.provinces.find((province) => province.id === company.province);

    if (provinceFound === undefined) {
      errors.push(this.validationErrors.resources.PROVINCE_NOT_FOUND);
    }

    return errors;
  }
  validateProvinceForUpdate(company: CompanyEntity, errors: Array<string>): Array<string> {
    if (company.province === undefined && company.province === null) {
      return errors;
    }

    const provinceFound: any = this.provinces.find((province) => province.id === company.province);

    if (provinceFound === undefined) {
      errors.push(this.validationErrors.resources.PROVINCE_NOT_FOUND);
    }

    return errors;
  }
  validateSectorForCreation(company: CompanyEntity, errors: Array<string>): Array<string> {
    const sectorFound: any = this.sectors.find((sector) => sector.id === company.sector);

    if (sectorFound === undefined) {
      errors.push(this.validationErrors.resources.SECTOR_NOT_FOUND);
    }

    return errors;
  }
  validateSectorForUpdate(company: CompanyEntity, errors: Array<string>): Array<string> {
    if (company.sector === undefined && company.sector === null) {
      return errors;
    }

    const sectorFound: any = this.sectors.find((sector) => sector.id === company.sector);

    if (sectorFound === undefined) {
      errors.push(this.validationErrors.resources.SECTOR_NOT_FOUND);
    }

    return errors;
  }
}
