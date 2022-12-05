/* connection to the database */

const knex = require("../db/connection");
const table = "reservations";

function create(newReservation) {
    return knex("reservations")
      .insert(newReservation)
      .returning("*")
      .then((newReservation) => newReservation[0]);
}

function read(reservation_id) {
    return knex("reservations")
      .select("*")
      .where({reservation_id})  
}

function updateStatus(updatedReservation) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: updatedReservation.reservation_id })
      .update({ status: updatedReservation.status })
      .returning("*");
}

function update (updatedReservation, reservation_id) {
    return knex("reservations")
      .where({reservation_id})
      .update({...updatedReservation})
      .returning("*")
      .then(result => result[0])
}

function list() {
    return knex(table).select("*");
}

function listByDate(reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .whereNot({ status: 'finished' })
      .orderBy("reservation_time");
}

function listByPhone(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`)
      .orderBy("reservation_date");
}

module.exports = {
    create,
    read,
    updateStatus,
    update,
    list,
    listByDate,
    listByPhone,
}