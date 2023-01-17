/* defines and exports route handler functions for RESERVATIONS */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

function validateProperties(req, res, next) {
  const { data = {} } = req.body;
  try {
    VALID_PROPERTIES.forEach((fields) => {
      if (!data[fields]) {
        const error = new Error(`A '${fields}' is required.`);
        error.status = 400;
        throw error;
      }
    });
    next();
  } catch (error) {
    next(error);
  }
}

function validateDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const isValid = Date.parse(date);

  if (!isValid) {
    next({
      status: 400,
      message: `reservation_date entered is invalid.`,
    });
  }
  return next();
}

function validateTime(req, res, next) {
  const time_regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const { reservation_time } = req.body.data;
  if (!time_regex.test(reservation_time)) {
    return next({
      status: 400,
      message: `reservation_time entered is invalid.`,
    });
  }
  return next();
}

function validateDateAndTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const dayOfWeek = new Date(reservation_date).getUTCDay();
  const today = new Date();
  const resDate = new Date(reservation_date);
  if (dayOfWeek === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays.",
    });
  }
  if (today > resDate) {
    return next({
      status: 400,
      message: "Reservation date must be in the future.",
    });
  }
  if (reservation_time < "10:30" || reservation_time > "21:30") {
    return next({
      status: 400,
      message: "Reservation time must be between 10:30am - 9:30pm.",
    })
  }
  return next();
}

function validatePeople(req, res, next) {
  const { people } = req.body.data;
  const validNumber = Number.isInteger(people);
  if ( people <= 0) {
    return next({
      status: 400,
      message: 'Number of people entered is invalid.',
    });
  }
  next();
}

function validatePhone(req, res, next) {
  const { mobile_number } = req.body.data;
  const regex = new RegExp(/\d{3}-\d{3}-\d{4}/);
  const regexTwo = new RegExp(/\d{10}/);
  if (regex.test(mobile_number) === true || regexTwo.test(mobile_number) === true) {
    return next();
  } else {
    return next({
      status: 400, 
      message: `Phone number is formatted incorrectly: ${mobile_number}`,
    });
  }
}

async function validateCreateReservationStatus(req, res, next) {
  const { status } = req.body.data;
  if (!status || status === "booked") return next();
  else
    return next({
      status: 400,
      message:
        "Create reservation status must be booked and not be seated or finished.",
    });
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservations = await service.read(reservation_id);
  const reservation = reservations[0];
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${reservation_id} not found.`,
  });
}

function validateStatus(req, res, next) {
  //check the status in the request
  const { status } = req.body.data;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `Status ${status} is not valid.`,
    });
  }
  next();
}

async function validateFinishedReservation(req, res, next) {
  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: "A -finished- reservation status cannot be updated.",
    });
  }
  return next();
}

// CRUDL

async function create(req, res) {
  const { data } = req.body;
  const newReservation = await service.create(data);
  res.status(201).json({ data: newReservation });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  const results = await service.read(reservation_id);
  const data = results[0];
  res.json({ data });
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const updatedReservation = {
    ...req.body.data,
    reservation_id,
  };
  const updatedRes = await service.updateStatus(updatedReservation);
  res.json({ data: updatedRes[0] });
}

async function update(req, res, next) {
  const { reservation_id } = req.params;
  const updatedData = { ...req.body.data };
  const data = await service.update(updatedData, reservation_id);
  res.status(200).json({ data });
}

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.listByPhone(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateProperties,
    validateDate,
    validateTime,
    validateDateAndTime,
    validatePeople,
    validatePhone,
    validateCreateReservationStatus,
    asyncErrorBoundary(create),
  ],
  read: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(read),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    validateStatus,
    validateFinishedReservation,
    asyncErrorBoundary(updateStatus),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    validateProperties,
    validateDate,
    validateTime,
    validateDateAndTime,
    validatePeople,
    validatePhone,
    asyncErrorBoundary(update),
  ]
};
