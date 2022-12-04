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

function validateTableName(tableName) {
    return tableName.length !== 1;
}

function validateCapacity(capacity) {
    return capacity > 0;
}

function hasTableName(req, res, next) {
    const tableName = req.body.data.table_name;
    if (tableName) {
        if (validateTableName(tableName)) {
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

function hasCapacity(req, res, next) {
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


function validateReservationId(req, res, next) {
    const reservationId = req.body.data.reservation_id;
    if (reservationId) {
        res.locals.reservationId = reservationId;
        return next();
    }
    next({
        status: 400,
        message: "body must have reservation_id property",
    });
}

async function validateReservationExists(req, res, next) {
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

async function validateTableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  return next({ status: 404, message: `table_id ${table_id} not found.` });
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

  function tableOccupied(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (!reservation_id) {
      return next({
        status: 400,
        message: 'Table is not occupied.',
      });
    }
    next();
  }

async function validateTableOccupancy(req, res, next) {
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
  // CRUDL

  async function create(req, res, next) {
    const { data } = req.body;
    const newTable = await service.create(data);
    res.status(201).json({ data: newTable });
  }

  async function list(req, res, next) {
    res.json({ data: await service.list() });
  }
  
  async function update(req, res, next) {
    const { table_id } = req.params;
    const { reservation_id } = req.body.data;
    res.json({ data: await service.update(reservation_id, table_id) });
  }

  async function destroy(req, res, next) {
    const { table_id, reservation_id } = res.locals.table;
    const data = await service.destroy(reservation_id, table_id);
    res.status(200).json({ data });
  }
  

  module.exports ={
    list: asyncErrorBoundary(list),
    create: [
        validateProperties,
        hasTableName,
        hasCapacity,
        asyncErrorBoundary(create),
    ],
    update: [
        validateProperties,
        validateReservationIdBody,
        asyncErrorBoundary(validateReservationId),
        asyncErrorBoundary(validateReservationExists),
        asyncErrorBoundary(validateTableCapacity),
        validateTableOccupancy,
        asyncErrorBoundary(update),
    ],
    destroy: [validateTableExists, tableOccupied, destroy],
  }