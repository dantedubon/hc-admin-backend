import Boom from 'boom';

import type { CompanyEntity, CompaniesValidator } from '../types/company';
import type { CommandHandler, Repository } from '../types/common';

export default class News implements CommandHandler {
  constructor({ newsRepository }) {
    this.repository = newsRepository;
  }

  createNews({ data }: { data: CompanyEntity }): Promise<CompanyEntity> {
    const news = { ...data, isDeleted: false };

    return this.repository.create(news);
  }
}
