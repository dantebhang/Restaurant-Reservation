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
	"status",
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
		(field) => !VALID_PROPERTIES.includes(field),
	);

	if (invalidFields.length) {
		return next({
			status: 400,
			message: `Invalid field(s): ${invalidFields.join(", ")}`,
		});
	}
	next();
};

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
	//will store the result if time matches the regex format
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
		message: `people: must be at least 1`,
	});
}

//reservations not allowed on Tuesdays
function closedTuesdays(req, res, next) {
	const { reservation_date } = req.body.data;
	const dayOfWeek = new Date(reservation_date).getUTCDay();
	//2 represents Tuesday
	if (dayOfWeek !== 2) {
		return next();
	}
	next({
		status: 400,
		message: `Restaurant is closed on Tuesdays`,
	});
}

//only allows reservations to be made in the future
function futureReservations(req, res, next) {
	const { reservation_date, reservation_time } = req.body.data;
	const today = Date.now();
	const dateInQuestion = new Date(reservation_date + " " + reservation_time);

	if (dateInQuestion > today) {
		return next();
	}
	next({
		status: 400,
		message: `reservation_date and reservation_time must be made in the future`,
	});
}

function reservationForOpenHours(req, res, next) {
	const { reservation_time } = req.body.data;
	//splice to make format time HHMM
	const resTime = Number(
		reservation_time.slice(0, 2) + reservation_time.slice(3, 5),
	);

	if (resTime < 1030 || resTime > 2130) {
		return next({
			status: 400,
			message: `Reservation_time must be between 10:30AM and 9:30PM.`,
		});
	}
	next();
}

// Validate that reservation with id in params exists
const reservationExists = async (req, res, next) => {
	const { reservation_id } = req.params;
	const reservation = await service.read(reservation_id);

	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `Reservation_id ${reservation_id} does not exist.`,
	});
};

function hasReservationId(req, res, next) {
	const reservation =
		req.params.reservation_id || req.body?.data?.reservation_id;

	if (reservation) {
		res.locals.reservation_id = reservation;
		next();
	} else {
		next({
			status: 400,
			message: `missing reservation_id`,
		});
	}
}

function unfinishedStatus(req, res, next) {
	if ("booked" !== res.locals.reservation.status) {
		next({
			status: 400,
			message: `Reservation status: '${res.locals.reservation.status}'.`,
		});
	} else {
		next();
	}
}

function checkStatus(req, res, next) {
	const { data = {} } = req.body;
	if (data["status"] === "seated" || data["status"] === "finished") {
		return next({ status: 400, message: `status is ${data["status"]}` });
	}
	next();
}
//CRUD

async function list(req, res) {
	const mobile_number = req.query.mobile_number;
	const data = await (mobile_number
		? service.search(mobile_number)
		: service.list(req.query.date));
	res.json({
		data,
	});
}

async function create(req, res) {
	const data = await service.create(req.body.data);
	res.status(201).json({ data });
}

async function read(req, res) {
	const data = res.locals.reservation;
	res.json({ data });
}

async function status(req, res) {
	res.locals.reservation.status = req.body.data.status;
	const data = await service.status(res.locals.reservation);
	res.json({ data });
}

async function update(req, res) {
	const { reservation_id } = res.locals.reservation;
	req.body.data.reservation_id = reservation_id;
	const data = await service.status(req.body.data);
	res.json({ data });
}

module.exports = {
	list: [asyncErrorBoundary(list)],
	create: [
		hasRequiredProperties,
		hasOnlyValidProperties,
		closedTuesdays,
		futureReservations,
		reservationForOpenHours,
		hasValidDate,
		hasValidTime,
		hasValidPartySize,
		checkStatus,
		asyncErrorBoundary(create),
	],
	read: [asyncErrorBoundary(reservationExists), read],
	status: [
		hasReservationId,
		asyncErrorBoundary(reservationExists),
		unfinishedStatus,
		asyncErrorBoundary(status),
	],
	update: [
		hasRequiredProperties,
		hasOnlyValidProperties,
		closedTuesdays,
		futureReservations,
		reservationForOpenHours,
		hasValidDate,
		hasValidTime,
		hasValidPartySize,
		checkStatus,
		hasReservationId,
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(update),
	],
};
