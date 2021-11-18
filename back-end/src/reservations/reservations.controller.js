/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//Middleware
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "reservation_id",
  "created_at",
  "updated_at",
];

const REQUIRED_PROPERTIES = [
	"first_name",
	"last_name",
	"mobile_number",
	"reservation_date",
	"reservation_time",
	"people",
];

const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

function hasValidDate(req, res, next) {
	const { reservation_date } = req.body.data;
	const result = Date.parse(reservation_date);

	if (isNaN(result)) {
		return next({
			status: 400,
			message: `reservation_date: ${reservation_date} is not a date.`,
		});
	}
	next();
}

const hasValidTime = (req, res, next) => {
	const { reservation_time } = req.body.data;
	const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
	//will store the result of if time matches the regex format
	const result = reservation_time.match(regex);

	if (result) {
		return next();
	}
	next({
		status: 400,
		message: `reservation_time: ${reservation_time} is not a time.`,
	});
};

function hasValidPartySize(req, res, next) {
	const { people } = req.body.data;
	if (typeof people === "number" && people >= 1) {
		return next();
	}
	next({
		status: 400,
		message: `people: Party size must be at least 1`,
	});
}

//CRUD

async function list(req, res) {
	const { date } = req.query;
	const data = await service.listReservationsByDate(date);
	res.json({ data });
}

async function create(req, res) {
	const data = await service.create(req.body.data);
	res.status(201).json({ data });
}

module.exports = {
	list: asyncErrorBoundary(list),
	create: [
		hasRequiredProperties,
    hasOnlyValidProperties,
		hasValidDate,
		hasValidTime,
    hasValidPartySize,
		asyncErrorBoundary(create),
	],
};
