const service = require('./tables.service');

const list = async (req, res) => {
  const tables = await service.list();
  res.locals.data = tables;
  const { data } = res.locals;
  res.json({ data: data });
};

const tableExist = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (tableId) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: 'Table cannot be found' });
};

const read = async (req, res) => {
  const table = await service.read();
  res.locals.table = table;
  const { data } = res.table;
  res.json({ data: data });
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
  list,
  read: [tableExist, read],
  update: [tableExist, update],
  delete: [tableExist, destroy],
};
