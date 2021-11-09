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

// CRUDL

const create = async (req, res) => {
  const data = await service.create(req.body.data);
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

const destroy = async (req, res, next) => {
  service
    .delete(res.locals.table.table_id)
    .then(() => res.sendStatus(204))
    .catch(next);
};

module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(tableExist), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(tableExist), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(tableExist), asyncErrorBoundary(destroy)],
};
