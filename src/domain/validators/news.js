export default class News {
  constructor({ newsRepository }) {
    this.repository = newsRepository;
  }

  async doesNewsExist({ id }) {
    const newsFound = await this.repository.findOne({ id });
    return newsFound !== undefined;
  }
}