import type { Mapper } from '../types/common';
import type { CompanyDataSource, CompanyEntity } from '../types/company';

export default class Company
implements Mapper<CompanyEntity, CompanyDataSource> {
  mapToDataSourceForCreation(entity: CompanyEntity): CompanyDataSource {
    // eslint-disable-line
    const now: Date = new Date();
    const urlsFixed = this.fixUrlFields(entity);

    const dataSource: CompanyDataSource = {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      sector: entity.sector,
      products: entity.products,
      capitalPercentage: entity.capitalPercentage,
      employeesPercentage: entity.employeesPercentage,
      productivityPercentage: entity.productivityPercentage,
      province: (entity.province === null || entity.city === undefined) ? -1 : entity.province,
      city: (entity.city === null || entity.city === undefined) ? -1 : entity.city,
      address: entity.address,
      branches: entity.branches.join(),
      email: entity.email,
      primaryPhoneNumber: entity.primaryPhoneNumber,
      isPrimaryPhoneNumberInWhatsapp: entity.isPrimaryPhoneNumberInWhatsapp,
      secondaryPhoneNumber: entity.secondaryPhoneNumber,
      isSecondaryPhoneNumberInWhatsapp: entity.isSecondaryPhoneNumberInWhatsapp,
      facebook: urlsFixed.facebook,
      instagram: urlsFixed.instagram,
      website: urlsFixed.website,
      image: entity.image,
      isAccepted: false,
      isDeleted: false,
      createdAt: now,
      updatedAt: now,
      status: 'PENDING',
    };
    return dataSource;
  }

  fixUrlFields(entity) {
    let facebook = entity.facebook;
    let instagram = entity.instagram;
    let website = entity.website;

    if (entity.facebook && !entity.facebook.startsWith('http://')
      && !entity.facebook.startsWith('https://')) {
      facebook = `http://${entity.facebook}`;
    }

    if (entity.instagram && !entity.instagram.startsWith('http://')
      && !entity.instagram.startsWith('https://')) {
      instagram = `http://${entity.instagram}`;
    }

    if (entity.website && !entity.website.startsWith('http://')
      && !entity.website.startsWith('https://')) {
      website = `http://${entity.website}`;
    }

    return {
      facebook,
      instagram,
      website,
    };
  }

  mapToDataSourceForUpdate(entity: CompanyEntity): any {
    // eslint-disable-line
    const dataSource: Object = Object.assign({}, entity);

    if (entity.branches && entity.branches.length > 0) {
      dataSource.branches = entity.branches.join();
    } else {
      delete dataSource.branches;
    }

    delete dataSource.isAccepted;
    delete dataSource.isDeleted;
    delete dataSource.createdAt;

    const urlsFixed = this.fixUrlFields(entity);

    Object.keys(urlsFixed).forEach((item) => {
      if (urlsFixed[item]) {
        dataSource[key] = urlsFixed[key];
      }
    });

    return dataSource;
  }

  mapToQuery(data): any {
    const { province, sector } = data;
    const query = {
      status: 'ACCEPTED',
    };

    if (province !== 0) {
      query.province = province;
    }

    if (sector !== 0) {
      query.sector = sector;
    }

    return query;
  }

  mapToEntity(dataSource: any): CompanyEntity {
    // eslint-disable-line
    let branches: Array<number> = [];
    const brachesSplitted = dataSource.branches.split(',');

    if (brachesSplitted.length > 0 && brachesSplitted[0] !== '') {
      branches = brachesSplitted.map((branch) => Number(branch));
    }

    const entity: CompanyEntity = {
      id: dataSource.id,
      name: dataSource.name,
      description: dataSource.description,
      sector: dataSource.sector,
      products: dataSource.products,
      capitalPercentage: dataSource.capitalPercentage,
      employeesPercentage: dataSource.employeesPercentage,
      productivityPercentage: dataSource.productivityPercentage,
      province: dataSource.province,
      city: dataSource.city,
      address: dataSource.address,
      branches,
      email: dataSource.email,
      primaryPhoneNumber: dataSource.primaryPhoneNumber,
      isPrimaryPhoneNumberInWhatsapp: dataSource.isPrimaryPhoneNumberInWhatsapp,
      secondaryPhoneNumber: dataSource.secondaryPhoneNumber,
      isSecondaryPhoneNumberInWhatsapp: dataSource.isSecondaryPhoneNumberInWhatsapp,
      facebook: dataSource.facebook,
      instagram: dataSource.instagram,
      website: dataSource.website,
      image: dataSource.image,
      isAccepted: dataSource.isAccepted,
      isDeleted: dataSource.isDeleted,
      createdAt: dataSource.createdAt,
      updatedAt: dataSource.updatedAt,
    };
    return entity;
  }
}
