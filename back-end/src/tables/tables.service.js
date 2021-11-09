const knex = require('../db/connection');

const list = () => {
  return knex('tables').select('*').orderBy('table_name');
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
  read,
  update,
  delete: destroy,
};
