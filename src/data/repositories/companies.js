import type {
  CompanyEntity,
  CompanyDataSource,
} from '../../domain/types/company';
import type {
  Repository,
  Model,
  Error,
  Mapper,
} from '../../domain/types/common';

export default class Companies implements Repository<number, CompanyEntity> {
  mapper: Mapper<CompanyEntity, CompanyDataSource>;
  model: Model<number, CompanyEntity>;
  constructor({ companyModel, companyMapper }: Object) {
    this.mapper = companyMapper;
    this.model = companyModel;
  }

  getAll(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({ order: ['id'] });
  }

  getAllPendingRequests(): Promise<Array<CompanyEntity>> {
    return this.model.findAll({
      where: {
        status: 'PENDING',
      },
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
    return this.model
      .findById(id)
      .then((response) => (response === null ? {} : this.mapper.mapToEntity(response)));
  }

  query(query: Object, options?: Object): Promise<Array<CompanyEntity>> {
    return this.model.find(query, options);
  }

  create(company: CompanyEntity): Promise<CompanyEntity> {
    const dataSource: CompanyDataSource = this.mapper.mapToDataSourceForCreation(company);

    return this.model.create(dataSource);
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
        return ((result && result[1]
          ? result[1]
          : { error: 'Company not found' }): Error);
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
