import type { CompanyEntity, CompaniesValidator } from '../types/company';
import type { Repository } from '../types/common';
import type { Province, ResourcesValidator } from '../types/resources';

export default class Company implements CompaniesValidator {
  provinces: Array<Province>;
  repository: Repository<number, CompanyEntity>;
  resourceValidator: ResourcesValidator;
  validationErrors: Object;

  constructor({
    companiesRepository,
    provinces,
    ResourceValidator,
    validationErrors,
  }) {
    this.provinces = provinces;
    this.repository = companiesRepository;
    this.resourceValidator = ResourceValidator;
    this.validationErrors = validationErrors;
  }
  validateCompanyForCreation(company: CompanyEntity): Array<string> {
    let errors: Array<string> = [];

    errors = this.resourceValidator.validateCityForCreation(company, errors);
    errors = this.resourceValidator.validateProvinceForCreation(company, errors);
    errors = this.resourceValidator.validateSectorForCreation(company, errors);
    errors = this.validateBranches(company, errors);

    return errors;
  }
  async validateCompanyForUpdate(company: CompanyEntity): Promise<Array<string>> {
    let errors: Array<string> = [];

    errors = await this.validateCompanyExistence(company, errors);

    if (errors.length > 0) {
      return errors;
    }

    if (company.city) {
      errors = this.resourceValidator.validateCityForUpdate(company, errors);
    }

    if (company.province) {
      errors = this.resourceValidator.validateProvinceForUpdate(company, errors);
    }
    
    if (company.sector) {
      errors = this.resourceValidator.validateSectorForUpdate(company, errors);
    }
    
    errors = this.validateBranches(company, errors);

    return Promise.resolve(errors);
  }
  async validateCompanyExistence(company: CompanyEntity, errors: Array<string>): Promise<Array<string>> {
    const newErrors: Array<string> = [];
    const companyFound = await this.repository.getById(company.id);

    if (Object.keys(companyFound).length === 0) {
      newErrors.push(this.validationErrors.companies.COMPANY_DOES_NOT_EXIST);
    }

    return Promise.resolve(errors.concat(newErrors));
  }
  validateBranches(company: CompanyEntity, errors: Array<string>): Array<string> {
    const newErrors: Array<string> = [];

    if (company.branches.length === 0) {
      return errors.concat(newErrors);
    }

    const inexistentBranch = company.branches.find((branch) => {
      const province = this.provinces.find((p) => p.id === branch);
      return province === undefined;
    });

    if (inexistentBranch !== undefined) {
      newErrors.push(this.validationErrors.companies.BRANCHES_MUST_EXIST);
      return errors.concat(newErrors);
    }

    return errors;
  }
}
