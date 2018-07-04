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

  updateNewsImage({ imageInformation }) {
    const { id, NewsImage } = imageInformation;
    if (!NewsImage) {
      return Boom.badRequest('No image upload');
    }
    const { hapi } = NewsImage;
    const { filename } = hapi;
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return Boom.badRequest('No image upload');
    }
    return this.repository.updateImage(id, NewsImage._data);
  }
}
