import { createContainer, Lifetime, asValue } from 'awilix';
import db from '../models';

import { Cities } from '../data/static/cities';
import { Provinces } from '../data/static/provinces';
import { Sectors } from '../data/static/sectors';
import { ValidationErrors } from '../data/static/validationErrors';

const container = createContainer();

function toCamel(a): string {
  return a.replace(/_([a-z])/gi, ($0, $1): string => $1.toUpperCase());
}

Object.keys(db)
  .filter((key) => key.toLowerCase() !== 'sequelize')
  .forEach((model) => {
    const keyValue = `${toCamel(model.toLowerCase())}Model`;
    container.register({
      [keyValue]: asValue(db[model]),
    });
  });

container.loadModules([`${__dirname}/../domain/command-handlers/*.js`], {
  formatName: (name, descriptor) => `${descriptor.value.name}Handler`,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

container.loadModules([`${__dirname}/../domain/validators/*.js`], {
  formatName: (name, descriptor) => `${toCamel(descriptor.value.name)}Validator`,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

container.loadModules([`${__dirname}/../data/repositories/*.js`], {
  formatName: (name) => `${toCamel(name)}Repository`,
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
});

container.register({
  cities: asValue(Cities),
  provinces: asValue(Provinces),
  sectors: asValue(Sectors),
  validationErrors: asValue(ValidationErrors),
});

console.log('The container has the following objects');
console.log(container.registrations);
export default container;
