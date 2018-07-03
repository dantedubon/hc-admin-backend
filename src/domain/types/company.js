export type CompanyEntity = {
  id: number,
  name: string,
  description: string,
  sector: number,
  products: string,
  capitalPercentage: number,
  employeesPercentage: number,
  productivityPercentage: number,
  province: number,
  city: number,
  address: string,
  branches: Array<number>,
  email: string,
  primaryPhoneNumber: string,
  secondaryPhoneNumber: string,
  facebook: string,
  instagram: string,
  website: string,
  image: any,
  isAccepted: boolean,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date,
};

export type CompanyDataSource = {
  id: number,
  name: string,
  description: string,
  sector: number,
  products: string,
  capitalPercentage: number,
  employeesPercentage: number,
  productivityPercentage: number,
  province: number,
  city: number,
  address: string,
  branches: string,
  email: string,
  primaryPhoneNumber: string,
  secondaryPhoneNumber: string,
  facebook: string,
  instagram: string,
  website: string,
  image: any,
  isAccepted: boolean,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date,
};

export interface CompaniesValidator {
  validateCompanyForCreation(company: CompanyEntity): Array<string>;
  validateCompanyForUpdate(company: CompanyEntity): Array<string>;
  validateBranches(company: CompanyEntity, errors: Array<string>): Array<string>;
}
