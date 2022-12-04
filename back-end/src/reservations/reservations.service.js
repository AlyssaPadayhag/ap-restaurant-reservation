const knex = require("../db/connection");
const table = "reservations";

function list() {
    return knex(table).select("*");
}

function listByDate(reservation_date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date })
      .orderBy("reservation_time");
}

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

module.exports = {
    list,
    listByDate,
    create,
    read,
}