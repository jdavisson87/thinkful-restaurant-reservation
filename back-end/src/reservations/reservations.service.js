const knex = require('../db/connection');

// returns non-finished reservations for the specified date
const searchByDate = (date) => {
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
    .whereNot('status', 'finished')
    .orderBy('reservation_time');
};

function searchByNumber(mobile_number) {
  return knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');
}

// returns a reservation for the specified id
const read = (id) => {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: Number(id) })
    .then((result) => result[0]);
};

const create = (reservation) => {
  return knex('reservations')
    .insert(reservation)
    .returning('*')
    .then((result) => result[0]);
};

// updates reservation

const update = (reservation_id, updatedReservation) => {
  return knex('reservations')
    .where({ reservation_id })
    .update(updatedReservation, '*')
    .then((result) => result[0]);
};

const destroy = (reservation_id) => {
  return knex('reservations').where({ reservation_id }).del();
};

// update status

const updateStatus = (reservation_id, status) => {
  return knex('reservations')
    .where({ reservation_id })
    .update({ status }, '*')
    .then((result) => result[0]);
};

module.exports = {
  searchByDate,
  searchByNumber,
  read,
  create,
  update,
  updateStatus,
  delete: destroy,
};
