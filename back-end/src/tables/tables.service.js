const knex = require('../db/connection');

const list = () => {
  return knex('tables').select('*').orderBy('table_name');
};

const create = (table) => {
  return knex('tables')
    .insert(table)
    .returning('*')
    .then((newTables) => newTables[0]);
};

const read = (id) => {
  return knex('tables')
    .select('*')
    .where({ table_id: id })
    .then((result) => result[0]);
};

const update = (updatedTable) => {
  return knex('tables')
    .select('*')
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, '*')
    .then((updatedTable) => updatedTable[0]);
};

const destroy = (tableId) => {
  return knex('tables').where({ table_id: tableId }).del();
};

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};
