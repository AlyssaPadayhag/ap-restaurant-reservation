/* connection to the database */

const knex = require("../db/connection");
const table = "tables";

function create(newTable) {
    return knex(table)
        .insert(newTable)
        .returning("*")
        .then((newTable) => newTable[0]);
}

function read(table_id) {
    return knex(table)
        .select("*")
        .where({ table_id: table_id })
        .first();
}

function readReservation(reservationId) {
    return knex("reservations")
        .select("*")
        .where({reservation_id: reservationId})
        .first();
}

function update({ table_id, reservation_id }) {
    return knex.transaction((trx) => {
      return knex("reservations")
        .transacting(trx)
        .where({ reservation_id: reservation_id })
        .update({ status: "seated" })
        .then(() => {
          return knex("tables")
            .where({ table_id: table_id })
            .update({ reservation_id: reservation_id })
            .returning("*");
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  }
  
function destroy(reservation_id, table_id) {
    return knex.transaction((trx) => {
      return knex('reservations')
        .transacting(trx)
        .where({ reservation_id: reservation_id })
        .update({ status: 'finished' })
        .returning('*')
        .then(() => {
          return knex('tables')
            .where({ table_id: table_id })
            .update({ reservation_id: null })
            .returning('*');
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
}

function list() {
    return knex(table).select("*").orderBy("table_name");
}

module.exports ={
    create,
    read,
    readReservation,
    update,
    destroy,
    list,
}