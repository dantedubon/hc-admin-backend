import type { CompanyEntity, CompanyDataSource } from '../../domain/types/company';
import type { Repository, Model, Error, Mapper } from '../../domain/types/common';

export default class Companies implements Repository<number, CompanyEntity> {
  mapper: Mapper<CompanyEntity, CompanyDataSource>;
  model: Model<number, CompanyEntity>;
  constructor({ companyModel, companyMapper }: Object) {
    this.mapper = companyMapper;
    this.model = companyModel;
  }

  getAll(data): Promise<Array<CompanyEntity>> {
    const query = this.mapper.mapToQuery(data);

    return this.model.findAll(
      {
        where: query,
        attributes: 
          { exclude: ['image'] },
      },
      {
        order: ['id'],
      })
      .then((response) => {
        return !response ?
          []
            :
          response.map((item) => this.mapper.mapToEntity(item));
      });
  }

  getAllPendingRequests(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({
        where: {
          status: 'PENDING',
        },
      })
      .then((response) => {
        return !response ?
          []
            :
          response.map((item) => this.mapper.mapToEntity(item));
      });
  }
  getAllDeniedRequests(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({
      where: {
        status: 'DENIED',
      },
    });
  }
  getAllDeletedRequests(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({
      where: {
        status: 'DELETED',
      },
    });
  }
  getAllAcceptedRequests(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({
      where: {
        status: 'ACCEPTED',
      },
    });
  }

  getById(id: number): Promise<CompanyEntity> {
    return this.model.findById(id).then((response) => (response === null ? {} : this.mapper.mapToEntity(response)));
  }

  query(query: Object, options?: Object): Promise<Array<CompanyEntity>> {
    return this.model.find(query, options);
  }

  create(company: CompanyEntity): Promise<CompanyEntity> {
    const dataSource: CompanyDataSource = this.mapper.mapToDataSourceForCreation(company);

    return this.model.create(dataSource);
  }

  acceptCompanyRequest(id) {
    return this.model
      .update(
        {
          status: 'ACCEPTED',
        },
        {
          where: { id },
        },
      )
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return ({ error: 'Company not found' }: Error);
      });
  }

  denyCompanyRequest(id) {
    return this.model
      .update(
        {
          status: 'DENIED',
        },
        {
          where: { id },
        },
      )
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return ({ error: 'Company not found' }: Error);
      });
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
        return ({ error: 'Company image not uploaded' }: Error);
      });
  }

  getCompanyImage(id) {
    return this.model.findById(id).then((response) => (response === null ? {} : response.image));
  }

  deleteCompanyRequest(id) {
    return this.model
      .update(
        {
          status: 'DELETED',
        },
        {
          where: { id },
        },
      )
      .then((result) => result)
      .catch((error) => {
        console.log(error);
        return ({ error: 'Company not found' }: Error);
      });
  }

  update(id: number, company: CompanyEntity): Promise<any> {
    const dataSource: Object = this.mapper.mapToDataSourceForUpdate(company);

    return this.model
      .update(dataSource, {
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

  delete(id: number): Promise<number> {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
