const knex = require('../db/connection');

// returns non-finished reservations for the specified date
const searchByDate = (date) => {
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
    .whereNot('status', 'finished')
    .orderBy('reservation_time');
};

// returns a reservation for the specified id
const read = (id) => {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: Number(id) })
    .then((result) => result[0]);
};

module.exports = {
  searchByDate,
  read,
};
