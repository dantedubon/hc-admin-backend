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

  getNewsImage({ data }) {
    const { id } = data;

    return this.repository.getNewsImage(id);
  }
  getAllNews() {
    return this.repository.getAll();
  }

  updateNewsImage({ imageInformation }) {
    const { id, file } = imageInformation;
    if (!file) {
      return Boom.badRequest('No image upload');
    }
    const { hapi } = file;
    const { filename } = hapi;
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return Boom.badRequest('No image upload');
    }
    return this.repository.updateImage(id, file._data);
  }

  deleteNews({ data }) {
    const { id } = data;
    return this.repository.deleteNews(id);
  }
}
