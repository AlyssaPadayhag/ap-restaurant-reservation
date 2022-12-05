/* defines and exports route handler functions for TABLES */

const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function validateProperties(req, res, next) {
    const data = req.body.data;
    if (data) return next();
    else
      return next({
        status: 400,
        message: "All fields need valid input",
      });
}

function validateTableName(req, res, next) {
    const tableName = req.body.data.table_name;
    if (tableName) {
        if (tableName.length !== 1) {
            return next();
        }
        next({
            status: 400,
            message: `${tableName} is not a valid table_name`,
        });
    }
    next({
        status: 400,
        message: "data must have table_name property",
    });
}

function validateCapacity(req, res, next) {
    const { capacity } = req.body.data;
    if (capacity && typeof capacity === "number" && Number(capacity) > 0) {
      return next();
    } else
      return next({
        status: 400,
        message: "capacity must be a number larger than 0",
    });
}

function validateReservationIdBody(req, res, next) {
    const { reservation_id } = req.body.data;
    if (reservation_id) {
      return next();
    }
    next({
      status: 400,
      message: "reservation_id is required",
    });
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    const reservations = await reservationsService.read(reservation_id);
    const reservation = reservations[0];
    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    } else
      return next({
        status: 404,
        message: `${reservation_id} does not exist`,
    });
}

async function validateReservationSeatedStatus(req, res, next) {
    if (res.locals.reservation.status === "seated") {
      return next({
        status: 400,
        message: "This reservation is already seated",
      });
    } else return next();
}

async function validateTableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table) {
      res.locals.table = table;
      return next();
    }
    return next({
      status: 404,
      message: `table_id ${table_id} not found.`
    });
}

async function validateTableCapacity(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (res.locals.reservation.people > Number(table.capacity)) {
      return next({
        status: 400,
        message: "Table capacity is too small for reservation size",
      });
    }
    next();
}

  async function validateTableAlreadyOccupied(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table.reservation_id === null) {
      return next();
    }
    next({
      status: 400,
      message: "This table is already occupied",
    });
  }

  function validateTableNotOccupied(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (!reservation_id) {
      return next({
        status: 400,
        message: 'Table is not occupied.',
      });
    }
    next();
  }

  // CRUDL

  async function create(req, res, next) {
    const { data } = req.body;
    const newTable = await service.create(data);
    res.status(201).json({ data: newTable });
  }
  
  async function update(req, res) {
    const { table_id } = req.params;
    const { reservation_id } = req.body.data;
    const updatedTable = {
      reservation_id: reservation_id,
      table_id: table_id,
    };
    const data = await service.update(updatedTable);
    res.json({ data });
  }

  async function destroy(req, res, next) {
    const { table_id, reservation_id } = res.locals.table;
    const data = await service.destroy(reservation_id, table_id);
    res.status(200).json({ data });
  }

  async function list(req, res, next) {
    res.json({ data: await service.list() });
  }
  
  module.exports ={
    list: asyncErrorBoundary(list),
    create: [
        validateProperties,
        validateTableName,
        validateCapacity,
        asyncErrorBoundary(create),
    ],
    update: [
        validateProperties,
        validateReservationIdBody,
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(validateReservationSeatedStatus),
        asyncErrorBoundary(validateTableCapacity),
        asyncErrorBoundary(validateTableAlreadyOccupied),
        asyncErrorBoundary(update),
    ],
    destroy: [
      validateTableExists,
      validateTableNotOccupied,
      destroy
    ],
  }