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

/**
 * Validating and creating new reservation
 */

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'people',
  'reservation_date',
  'reservation_time',
];

const validateProperties = (req, res, next) => {
  const { data = {} } = req.body;
  const invalidProps = Object.keys(data).filter(
    (prop) => !VALID_PROPERTIES.includes(prop)
  );
  if (invalidProps.length > 0) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidProps.join(', ')}`,
    });
  }
  next();
};

const validateValues = (req, res, next) => {
  const { reservation_date, reservation_time, people } = req.body.data;
  next();
};

const create = async (req, res) => {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateProperties, validateValues, asyncErrorBoundary(create)],
};
