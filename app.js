const path = require('path');
const AutoLoad = require('fastify-autoload');
// const fastifyMongodb = require('fastify-mongodb');
require('dotenv').config();

module.exports = async function (fastify, opts) {
  // eslint-disable-next-line
  fastify.register(require('fastify-mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
    url: process.env.MONGODB_URL,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
};
