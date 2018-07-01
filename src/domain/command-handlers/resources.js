import type { CommandHandler, Repository } from '../types/common';
import type { Province } from '../types/resources';
import { Provinces } from '../../data/static/provinces';

export default class Resources implements CommandHandler {
  repository: Repository<number>;

  getProvinces(): Promise<Array<Province>> { // eslint-disable-line class-methods-use-this
    return Provinces;
  }
}
