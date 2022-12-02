/**
 * List handler for reservation resources
 */

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

function validatePeople(req, res, next) {
  const { people } = req.body.data;
  const validNumber = Number.isInteger(people);
  if (!validNumber || people <= 0) {
    return next({
      status: 400,
      message: 'Number of people entered is an invalid number.',
    });
  }
  next();
}

function validateDate(req, res, next) {
  const date = req.body.data.reservation_date;
  const isValid = Date.parse(date);

  if (!isValid) {
    next({
      status: 400,
      message: `reservation_date is not a valid date.`,
    });
  }
  return next();
}

function validateTime(req, res, next) {
  const time_regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  const time = req.body.data.reservation_time;
  if (!time_regex.test(time)) {
    return next({
      status: 400,
      message: `reservation_time is not a valid time`,
    });
  }
  return next();
}

function validateTimeAndDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const dayOfWeek = new Date(reservation_date).getUTCDay();
  const today = new Date();
  const resDate = new Date(reservation_date);
  if (dayOfWeek === 2) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  }
  if (today > resDate) {
    return next({
      status: 400,
      message: "Reservation needs to be in the future",
    });
  }
  return next();
}

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    res.json({ data: await service.listByDate(date) });
  } else {
    res.json({ data: await service.list() });
  }
}

async function create(req, res) {
  const { data } = req.body;
  const newReservation = await service.create(data);
  res.status(201).json({ data: newReservation });
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateProperties,
    validateDate,
    validateTime,
    validateTimeAndDate,
    validatePeople,
    asyncErrorBoundary(create),
  ],
};
