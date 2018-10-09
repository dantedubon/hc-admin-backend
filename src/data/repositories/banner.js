import type { Banner } from '../../domain/types/banner';
import type { Repository, Model, Error } from '../../domain/types/common';

export default class Banners implements Repository<number, Banner> {
  model: Model<number, Banner>;
  constructor({ bannerModel }: Object) {
    this.model = bannerModel;
  }

  getAll(): Promise<Array<Banner>> {
    return this.model.findAll({ order: ['order'] });
  }

  getById(id: any): Promise<Banner> {
    return this.model.findById(id);
  }

  create(banner: Banner): Promise<Banner> {
    return this.model.create(banner);
  }

  update(id: string, banner: Banner): Promise<any> {
    return this.model
      .update(banner, {
        where: { id },
        returning: true,
        plain: true,
      })
      .then((result: any) => ((result && result[1] ? result[1] : { error: 'Banner not found' }): Error))
      .catch(() => ({ error: 'Banner not found' }: Error));
  }

  updateBannerOrder(id: string, order: number): Promise<any> {
    return this.model.update(
      { order },
      {
        where: {
          id,
        },
      },
    );
  }

  delete(id: string): Promise<string> {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
