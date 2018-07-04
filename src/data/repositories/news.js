export default class News {
  constructor({ newModel }: Object) {
    this.model = newModel;
  }

  getAll() {
    return this.model.findAll(
      { where: { isDeleted: false }, attributes: { exclude: ['image'] } },
      { order: ['createdAt', 'DESC'] },
    );
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

  deleteNews(id) {
    return this.model
      .update(
        {
          isDeleted: true,
        },
        {
          where: { id },
        },
      )
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return ({ error: 'News not found' }: Error);
      });
  }

  getNewsImage(id) {
    return this.model.findById(id).then((response) => (response === null ? {} : response.image));
  }
}
