const service = require('./tables.service');
const reservationService = require('../reservations/reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

const list = async (req, res) => {
  const tables = await service.list();
  res.locals.data = tables;
  const { data } = res.locals;
  res.json({ data: data });
};

const tableExist = async (req, res, next) => {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: 'Table cannot be found' });
};

const duplicateNameCheck = async (req, res, next) => {
  const { table_name } = req.body.data;
  const tables = await service.list();
  const tableNames = tables.map((table) => table.table_name);
  if (!tableNames.includes(table_name)) {
    return next();
  }
  next({
    status: 404,
    message: 'There is already a table with this name',
  });
};

const tableNameIsValid = (tableName) => {
  return tableName.length > 1;
};

const capacityIsValid = (capacity) => {
  return capacity > 0;
};

const validValues = (req, res, next) => {
  const { table_name, capacity } = req.body.data;
  if (!capacity || !capacityIsValid(capacity)) {
    return next({
      status: 400,
      message: 'capacity must be a whole number greater than or equal to 1',
    });
  }
  if (!table_name || !tableNameIsValid(table_name)) {
    return next({
      status: 400,
      message: 'table_name must be more than one character',
    });
  }
  next();
};

const isTableValidForDeletion = (req, res, next) => {
  const { table_id } = res.locals.table;
  if (table_id < 5) {
    return next({
      status: 400,
      message: 'This is a default table and is unable to be deleted',
    });
  }
  next();
};

// CRUDL

const create = async (req, res) => {
  const newTable = await service.create(req.body.data);
  const data = {
    table_name: newTable.table_name,
    capacity: newTable.capacity,
    open: true,
    reservation_id: null,
  };
  res.status(201).json({ data });
};

const read = async (req, res) => {
  const { table } = res.locals;
  res.json({ data: table });
};

const update = async (req, res, next) => {
  service
    .update(req.body.data)
    .then((data) => res.sendStatus(204))
    .catch(next);
};

// Need to make sure the destroy function is not called if table_id is less than 5

const destroy = async (req, res, next) => {
  service
    .delete(res.locals.table.table_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

// assigning res

const hasResId = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  if (reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: 'reservation id is missing',
  });
};

const reservationExists = async (req, res, next) => {
  const { reservation_id } = req.body.data;
  const reservation = await reservationService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist`,
  });
};

const reservationBooked = async (req, res, next) => {
  const { reservation } = res.locals;
  if (reservation.status !== 'seated') {
    return next();
  }
  next({
    status: 400,
    message: `Reservation ${reservation.reservation_id} is already seated`,
  });
};

const tableSize = (req, res, next) => {
  const { table, reservation } = res.locals;
  if (table.capacity >= reservation.people) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.table_name} does not have enough room for ${reservation.people} people`,
  });
};

const tableFree = (req, res, next) => {
  const { table } = res.locals;
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.tableName} is already occupied`,
  });
};

const occupyTable = (req, res, next) => {
  const { table } = res.locals;
  const { reservation_id } = req.body.data;
  table.reservation_id = reservation_id;
  res.locals.resId = reservation_id;
  res.locals.resStatus = 'seated';
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation ${reservation_id} could not be assigned a table`,
  });
};

const tableOccupied = (req, res, next) => {
  const { table } = res.locals;
  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.tableName} is not occupied`,
  });
};

const removeFromTable = (req, res, next) => {
  const { table } = res.locals;
  res.locals.resId = table.reservation_id;
  table.reservation_id = null;
  res.locals.resStatus = 'finished';
  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table ${table.tableName} could not remove reservation with id ${table.reservation_id}`,
  });
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validValues,
    asyncErrorBoundary(duplicateNameCheck),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExist), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(tableExist), asyncErrorBoundary(update)],
  assignReservation: [
    asyncErrorBoundary(hasResId),
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(reservationBooked),
    asyncErrorBoundary(tableExist),
    tableSize,
    tableFree,
    occupyTable,
    asyncErrorBoundary(update),
  ],
  deleteReservationId: [
    asyncErrorBoundary(tableExist),
    tableOccupied,
    removeFromTable,
    asyncErrorBoundary(update),
  ],
  delete: [
    asyncErrorBoundary(tableExist),
    isTableValidForDeletion,
    asyncErrorBoundary(destroy),
  ],
};
