import Boom from 'boom';

import type { Banner } from '../types/banner';
import type { CommandHandler, Repository } from '../types/common';

export default class Banners implements CommandHandler {
  repository: Repository<number, Banner>;
  constructor({ bannerRepository }) {
    this.repository = bannerRepository;
  }

  createBanner({ data }): Promise<Banner> {
    const { name, description, image } = data;

    return this.repository.create({
      name,
      description,
      image: image._data,
    });
  }
}
