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

  updateImage(id, data) {
    return this.model
      .update(
        {
          image: data,
        },
        {
          where: { id },
        },
      )
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return ({ error: 'News image not uploaded' }: Error);
      });
  }

  getNewsImage(id) {
    return this.model.findById(id).then((response) => (response === null ? {} : response.image));
  }
}
