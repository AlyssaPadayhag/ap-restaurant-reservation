const knex = require("../db/connection");
const table = "tables";

function list() {
    return knex(table).select("*").orderBy("table_name");
}

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

async function update(reservation_id, table_id) {
    return knex("reservations")
      .where({ reservation_id })
      .then(() =>
        knex("tables")
          .where({ table_id })
          .update({ reservation_id }, [
            "table_id",
            "table_name",
            "capacity",
            "reservation_id",
          ])
          .then((result) => result[0].status)
      );
  }

  function destroy(reservation_id, table_id) {
    return knex("reservations")
      .where({ reservation_id })
      .returning("*")
      .then(() => {
        return knex("tables")
          .where({ table_id })
          .update({ reservation_id: null });
      });
  }

module.exports ={
    create,
    read,
    readReservation,
    update,
    destroy,
    list,
}