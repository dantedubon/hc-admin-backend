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

  getAllBanners(): Promise<Array<Banner>> {
    return this.repository.getAll();
  }
  deleteBanner({ data }) {
    const { id } = data;

    return this.repository.delete(id);
  }

  async updateBanner({ data }): Promise<Banner> {
    return this.repository.update(data.id, data);
  }

  async updateBannersOrder({ data }): Promise<Banner> {
    return data.map((banner) => this.repository.updateBannerOrder(banner.id, banner.order));
  }
}
