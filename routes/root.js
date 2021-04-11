module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log('___');
    console.log(this.mongo.db);
    console.log('___');

    return { root: true };
  });
};
