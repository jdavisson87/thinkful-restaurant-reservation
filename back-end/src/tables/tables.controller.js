const service = require('./tables.service');
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
  return next({ status: 404, message: 'Table cannot be found' });
};

const duplicateNameCheck = async (req, res, next) => {
  const { table_name } = req.body.data;
  const tables = await service.list();
  const tableNames = tables.map((table) => table.table_name);
  if (tableNames.includes(table_name)) {
    return next({
      status: 404,
      message: 'There is already a table with this name',
    });
  }
  next();
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

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validValues,
    asyncErrorBoundary(duplicateNameCheck),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(tableExist), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(tableExist), asyncErrorBoundary(update)],
  delete: [
    asyncErrorBoundary(tableExist),
    isTableValidForDeletion,
    asyncErrorBoundary(destroy),
  ],
};
