import type { CompanyEntity } from './company';

export type City = {
  id: number,
  label: string,
};

export type Province = {
  id: number,
  label: string,
};

export type Sector = {
  id: number,
  label: string,
};

export type Command = {
  type: string,
};

export interface ResourcesValidator {
  validateCityRequest(provinceId: Number): Array<string>;
  validateCityForCreation(company: CompanyEntity, errors: Array<string>): Array<string>;
  validateCityForUpdate(company: CompanyEntity, errors: Array<string>): Array<string>;
  validateProvinceForCreation(company: CompanyEntity, errors: Array<string>): Array<string>;
  validateProvinceForUpdate(company: CompanyEntity, errors: Array<string>): Array<string>;
  validateSectorForCreation(company: CompanyEntity, errors: Array<string>): Array<string>;
  validateSectorForUpdate(company: CompanyEntity, errors: Array<string>): Array<string>;
}
