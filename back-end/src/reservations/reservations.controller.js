const service = require('./reservations.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

/**
 * List handler for reservation resources
 */

const hasValidQuery = (req, res, next) => {
  const { date, mobile_number } = req.query;
  if (!date && !mobile_number) {
    return next({
      status: 400,
      message: `Either a date of mobile_number query is needed`,
    });
  }
  next();
};

const list = async (req, res) => {
  const { date, mobile_number } = req.query;

  const reservations = await (mobile_number
    ? service.searchByNumber(mobile_number)
    : service.searchByDate(date));
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
  'status',
  'reservation_id',
  'created_at',
  'updated_at',
];

const REQ_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
];

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(...REQ_PROPERTIES);

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

const validUpdateStatus = (req, res, next) => {
  const { status } = res.locals.reservation;
  if (status !== 'booked') {
    return next({
      status: 400,
      message: 'You can only edit reservations that are "booked".',
    });
  }
  next();
};

const dateFormat = /^\d\d\d\d-\d\d-\d\d$/;
const timeFormat = /^\d\d:\d\d$/;

function timeIsValid(timeString) {
  return timeString.match(timeFormat)?.[0];
}

function dateFormatIsValid(dateString) {
  return dateString.match(dateFormat)?.[0];
}

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

function statusIsBookedOrNull(status) {
  if (!status || status === 'booked') {
    return true;
  } else {
    return false;
  }
}

const validateValues = (req, res, next) => {
  const { reservation_date, reservation_time, people } = req.body.data;
  if (!Number.isInteger(people) || people < 1) {
    return next({
      status: 400,
      message: 'Number of people must be greater than 0 and be a whole number',
    });
  }
  if (!timeIsValid(reservation_time)) {
    return next({
      status: 400,
      message: `reservation_time must be in HH:MM:SS (or HH:MM) format ${reservation_time}`,
    });
  }
  if (!dateFormatIsValid(reservation_date)) {
    return next({
      status: 400,
      message: 'reservation_date must be in YYYY-MM-DD format',
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
  if (!statusIsBookedOrNull(req.body.data?.status)) {
    return next({
      status: 400,
      message: 'seated and finished are not valid statuses on creation',
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

const update = async (req, res) => {
  const { reservation_id } = res.locals.reservation;
  const newReservation = req.body.data;
  const oldReservation = res.locals.reservation;
  const updatedInformation = { ...oldReservation, ...newReservation };

  let updatedReservation = await service.update(
    reservation_id,
    updatedInformation
  );
  res.status(200).json({ data: updatedReservation });
};

const destroy = async (req, res, next) => {
  service
    .delete(res.locals.reservation.reservation_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

// updating a reservations status

const VALID_STATUSES = ['seated', 'finished', 'booked', 'cancelled'];
const statusIsValid = (req, res, next) => {
  const { status = 'unknown' } = req.body.data;

  if (!VALID_STATUSES.includes(status)) {
    return next({
      status: 400,
      message: `${status} is an invalid status`,
    });
  }

  next();
};

const isStatusFinished = (req, res, next) => {
  const { status } = res.locals.reservation;
  if (status === 'finished') {
    return next({
      status: 400,
      message: 'a finished reservation cannot be updated',
    });
  }
  next();
};

const updateStatus = async (req, res) => {
  const newStatus = req.body.data.status;
  const { reservation_id } = res.locals.reservation;
  let data = await service.updateStatus(reservation_id, newStatus);
  res.status(200).json({ data });
};

module.exports = {
  list: [hasValidQuery, asyncErrorBoundary(list)],
  create: [
    validateProperties,
    hasRequiredProperties,
    validateValues,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    validateProperties,
    hasRequiredProperties,
    validateValues,
    validUpdateStatus,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    statusIsValid,
    isStatusFinished,
    asyncErrorBoundary(updateStatus),
  ],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
};
