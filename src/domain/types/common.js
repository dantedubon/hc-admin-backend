/* eslint-disable no-unused-vars */

// Interfaces
export interface Model<TypeOfPKey, TypeOfEntity> {
  find(query: Object, options?: Object) : Promise<Array<TypeOfEntity>>;
  findAll(options: Object): Promise<Array<TypeOfEntity>>;
  findById(id: TypeOfPKey): Promise<TypeOfEntity>;
  create(newEntity: any): Promise<TypeOfEntity>;
  update(updatedEntity: TypeOfEntity, options: Object): Promise<TypeOfEntity>;
  destroy(options: Object): Promise<number>;
}

export interface Repository<TypeOfPKey, TypeOfEntity> {
  model: Model<TypeOfPKey, TypeOfEntity>;
  getAll(): Promise<Array<TypeOfEntity>>;
  getById(id: TypeOfPKey): Promise<TypeOfEntity>;
  create(newEntity: TypeOfEntity): Promise<TypeOfEntity>;
  update(id: TypeOfPKey, updatedEntity: TypeOfEntity): Promise<TypeOfEntity>;
  delete(id: TypeOfPKey): Promise<number>;
}

export interface CommandHandler {
  repository: Repository<*, *>;
}

export interface Mapper<TypeOfEntity, TypeOfDataSource> {
  mapToDataSourceForCreation(entity: TypeOfEntity): TypeOfDataSource;
  mapToDataSourceForUpdate(entity: TypeOfEntity): any;
  mapToEntity(dataSource: any): TypeOfEntity;
}

// Other objects
export type Error = {
  error: string
};
