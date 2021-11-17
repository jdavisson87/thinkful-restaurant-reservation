const service = require('./reservations.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */
const list = async (req, res) => {
  const { date } = req.query;

  const reservations = await service.searchByDate(date);
  res.json({ data: reservations });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
};
