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

  findOne(query) {
    return this.model.findOne(query);
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

  update(id: number, news): Promise<any> {
    return this.model
      .update(news, {
        where: { id },
        returning: true,
        plain: true,
      })
      .then((result: any) => {
        console.log(result);
        return ((result && result[1] ? result[1] : { error: 'Company not found' }): Error);
      })
      .catch((error) => {
        console.log(error);
        return ({ error: 'Company not found' }: Error);
      });
  }
}
