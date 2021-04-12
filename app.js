const path = require('path');
const AutoLoad = require('fastify-autoload');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async function (fastify, opts) {
  // connected fastify to mongoose
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    fastify.decorate('mongo', db);
  } catch (e) {
    console.error(e);
  }

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
