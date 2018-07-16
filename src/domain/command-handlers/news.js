import Boom from 'boom';

export default class News {
  constructor({ newsRepository, NewsValidator }) {
    this.repository = newsRepository;
    this.validator = NewsValidator;
  }

  createNews({ data }): Promise {
    const news = { ...data, isDeleted: false };
    return this.repository.create(news);
  }

  getNewsImage({ data }) {
    const { id } = data;
    return this.repository.getNewsImage(id);
  }

  async updateNews({ data }): Promise {
    const doesNewsExist = await this.validator.doesNewsExist({ id: data.id });

    if (!doesNewsExist) {
      return Boom.badRequest('Record does not exist in our system');
    }

    return this.repository.update(data.id, data);
  }

  getAllNews() {
    return this.repository.getAll();
  }

  updateNewsImage({ imageInformation }) {
    const { id, file } = imageInformation;
    if (!file) {
      return Boom.badRequest('No image upload');
    }
    const { hapi } = file;
    const { filename } = hapi;
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return Boom.badRequest('No image upload');
    }
    return this.repository.updateImage(id, file._data);
  }

  deleteNews({ data }) {
    const { id } = data;
    return this.repository.deleteNews(id);
  }
}
