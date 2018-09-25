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

  update(id: number, encounter: Banner): Promise<any> {
    return this.model
      .update(encounter, {
        where: { id },
        returning: true,
        plain: true,
      })
      .then((result: any) => ((result && result[1] ? result[1] : { error: 'Encounter not found' }): Error))
      .catch(() => ({ error: 'Encounter not found' }: Error));
  }

  delete(id: string): Promise<string> {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
