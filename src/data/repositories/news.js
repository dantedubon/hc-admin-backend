export default class News {
  constructor({ newModel }: Object) {
    this.model = newModel;
  }

  getAll() {
    return this.model.findAll({ attributes: { exclude: ['image'] } }, { order: ['id'] });
  }

  create(news) {
    return this.model.create(news);
  }
}
