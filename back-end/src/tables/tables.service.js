const knex = require('../db/connection');

const list = () => {
  return knex('tables').select('*');
};

module.exports = {
  list,
};
