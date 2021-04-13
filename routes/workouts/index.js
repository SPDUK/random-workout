// External Dependancies
const boom = require('boom');
const Workout = require('../../models/Workout');

module.exports = async function (fastify, opts) {
  fastify.post('/', async (req, reply) => {
    try {
      const workout = new Workout(req.body);

      return workout.save();
    } catch (err) {
      throw boom.boomify(err);
    }
  });

  fastify.get('/', async (req, reply) => {
    try {
      const workouts = await Workout.find();

      return workouts;
    } catch (err) {
      throw boom.boomify(err);
    }
  });

  fastify.get('/search', async (req, reply) => {
    try {
      const { page, query, limit } = req.query;

      const maxLimit = limit > 100 ? 100 : Number(limit);

      // console.log(req.params.page, req.query);
      const validPage = page <= 0 ? 0 : page - 1;

      console.log({ page, query: req.query.query });

      const skip = validPage * limit;

      const results = await Workout.find({ $text: { $search: query } })
        .select('title')
        .sort({ _id: -1 }) // sorts by generation time of id
        .limit(maxLimit)
        .skip(skip);

      return results;
    } catch (err) {
      throw boom.boomify(err);
    }
  });

  fastify.get('/:id', async (req, reply) => {
    try {
      const { id } = req.params;

      const workout = await Workout.findById(id);

      return workout;
    } catch (err) {
      throw boom.boomify(err);
    }
  });

  fastify.put('/:id', async (req, reply) => {
    try {
      const { id } = req.params;
      const workout = req.body;
      const { ...updateData } = workout;

      const update = await Workout.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      return update;
    } catch (err) {
      throw boom.boomify(err);
    }
  });

  fastify.delete('/:id', async (req, reply) => {
    try {
      const { id } = req.params;

      const workout = await Workout.findByIdAndRemove(id);

      return workout;
    } catch (err) {
      throw boom.boomify(err);
    }
  });
};
