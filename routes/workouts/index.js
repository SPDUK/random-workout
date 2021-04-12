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
      const workout = await Workout.find();

      return workout;
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
