import Boom from 'boom';

import type { CompanyEntity, CompaniesValidator } from '../types/company';
import type { CommandHandler, Repository } from '../types/common';

export default class Companies implements CommandHandler {
  repository: Repository<number, CompanyEntity>;
  validator: CompaniesValidator;

  constructor({ companiesRepository, CompanyValidator }) {
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

  updateCompanyImage({ imageInformation }) {
    const { id, CompanyImage } = imageInformation;
    if (!CompanyImage) {
      return Boom.badRequest('No image upload');
    }
    const { hapi } = CompanyImage;
    const { filename } = hapi;
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return Boom.badRequest('No image upload');
    }
    return this.repository.updateImage(id, CompanyImage._data);
  }

  acceptCompanyRequest({ data }) {
    const { id } = data;

    return this.repository.acceptCompanyRequest(id);
  }

  getCompanyImage({ data }) {
    const { id } = data;

    return this.repository.getCompanyImage(id);
  }

  denyCompanyRequest({ data }) {
    const { id } = data;

    return this.repository.denyCompanyRequest(id);
  }
  deleteCompanyRequest({ data }) {
    const { id } = data;

    return this.repository.deleteCompanyRequest(id);
  }
  getAllCompanies({ data }): Promise<Array<CompanyEntity>> {
    return this.repository.getAll(data);
  }

  getAllPendingRequests() {
    return this.repository.getAllPendingRequests();
  }
  getAllDeniedRequests() {
    return this.repository.getAllDeniedRequests();
  }
  getAllAcceptedRequests() {
    return this.repository.getAllAcceptedRequests();
  }
  getAllDeletedRequests() {
    return this.repository.getAllDeletedRequests();
  }
}
