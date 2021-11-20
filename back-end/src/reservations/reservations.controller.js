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

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

const timeIsValid = (timeString) => {
  return timeString.match(timeFormat)?.[0];
};

const dateFormatIsValid = (dateString) => {
  return dateString.match(dateFormat)?.[0];
};

const dateNotInPast = (dateString, timeString) => {
  const now = new Date();
  // creating a date object using a string like:  '2021-10-08T01:21:00'
  const reservationDate = new Date(dateString + 'T' + timeString);
  return reservationDate >= now;
};

const duringBusinessHours = (time) => {
  const open = '10:30';
  const close = '21:30';
  return time <= close && time >= open;
};

const isDateNotTuesday = (date) => {
  const reservation_day = new Date(date);
  return reservation_day.getUTCDay() !== 2;
};

const validateValues = (req, res, next) => {
  const {
    reservation_date,
    reservation_time,
    people,
    status = 'booked',
  } = req.body.data;
  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: 'Number of people must be greater than 0 and be a whole number',
    });
  }
  if (status !== 'booked') {
    return next({
      status: 400,
      message: 'A status of "seated" or "finished" are not valid upon creation',
    });
  }
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: 'reservation time must be in HH:MM:SS (or HH:MM) format',
    });
  }
  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: 'reservation date must be in YYYY-MM-DD format',
    });
  }

  if (!dateNotInPast(reservation_date, reservation_time)) {
    return next({
      status: 400,
      message:
        'You are attempting to submit a reservation that has past its date.  Only future reservations allowed.',
    });
  }

  if (!duringBusinessHours(reservation_time)) {
    return next({
      status: 400,
      message:
        'You are attempting to make a reservation while we are closed.  Reservation times must be in between 10:30 AM and 9:30 PM',
    });
  }

  if (!isDateNotTuesday(reservation_date)) {
    return next({
      status: 400,
      message: 'We are closed on Tuesdays',
    });
  }

  next();
};

const create = async (req, res) => {
  const reservation = await service.create(req.body.data);
  res.status(201).json({ data: reservation });
};

/*
 *  Reading specific reservations
 */

const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation with id: ${reservationId} does not exist`,
  });
};

const read = (req, res) => {
  const { reservation } = res.locals;
  res.json({ data: reservation });
};

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [validateProperties, validateValues, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
