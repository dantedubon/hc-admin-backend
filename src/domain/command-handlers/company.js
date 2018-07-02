import Boom from 'boom';

import type { CompanyEntity, CompaniesValidator } from '../types/company';
import type { CommandHandler, Repository } from '../types/common';

export default class Companies implements CommandHandler {
  repository: Repository<number, CompanyEntity>;
  validator: CompaniesValidator;

  constructor({
    companiesRepository,
    CompanyValidator,
  }) {
    this.repository = companiesRepository;
    this.validator = CompanyValidator;
  }

  createCompany({ data }: { data: CompanyEntity }): Promise<CompanyEntity> {
    const validationErrors = this.validator.validateCompanyForCreation(data);

    if (validationErrors.length > 0) {
      return Boom.badRequest(validationErrors);
    }
    return this.repository.create(data);
  }

  async updateCompany({ data }: { data: CompanyEntity }): Promise<CompanyEntity> {
    const validationErrors = await this.validator.validateCompanyForUpdate(data);

    if (validationErrors.length > 0) {
      return Boom.badRequest(validationErrors);
    }

    return this.repository.update(data.id, data);
  }

  getAllCompanies(): Promise<Array<CompanyEntity>> {
    return this.repository.getAll();
  }
}
