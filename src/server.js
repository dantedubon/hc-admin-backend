/* eslint-disable no-param-reassign, no-console */
require('dotenv').config();
const models = require('./models');

const Glue = require('glue');
const manifest = require('./config');
const Pack = require('./package.json');

const options = {
  relativeTo: __dirname,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await models.sequelize.sync();
    await server.start();
    console.log(`Start on ${process.env.NODE_ENV}`)
    console.log(`✅  ${Pack.name} started.`);
    console.log('hapi days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
