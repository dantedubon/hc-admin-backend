import Boom from 'boom';

import type { Banner } from '../types/banner';
import sharp from 'sharp';
import type { CommandHandler, Repository } from '../types/common';

export default class Banners implements CommandHandler {
  repository: Repository<number, Banner>;
  constructor({ bannerRepository }) {
    this.repository = bannerRepository;
  }

  async createBanner({ data }): Promise<Banner> {
    const { name, description, image } = data;

    const newImage = await sharp(image._data).resize(1250, 500).min().toBuffer();
    return this.repository.create({
      name,
      description,
      image: newImage,
    });
    // .then((newImage) => this.repository.create({
    //   name,
    //   description,
    //   image: newImage,
    // }));
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
