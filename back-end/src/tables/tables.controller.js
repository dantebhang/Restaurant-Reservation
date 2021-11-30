/**
 * List handler for reservation resources
 */


const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("../reservations/reservations.service");

// VALIDATION MIDDLEWARE
function hasReservationId(req, res, next) {
	const table = req.body.data;
	if (!table) {
		return next({ status: 400, message: "Must have data property" });
	}
	if (!table.reservation_id) {
		return next({ status: 400, message: "Must have reservation_id" });
	}
	next();
}

// Check if reservation_id exists
const reservationExists = async (req, res, next) => {
	const { reservation_id } = req.body.data;
	const reservation = await reservationsService.read(reservation_id);

	if (reservation) {
		res.locals.reservation = reservation;
		return next();
	}
	next({
		status: 404,
		message: `reservation_id '${reservation_id}' does not exist`,
	});
};

function bodyDataHas(propertyName) {
	return function (req, res, next) {
		const { data = {} } = req.body;
		if (data[propertyName]) {
			return next();
		}
		next({ status: 400, message: `Must include a ${propertyName}` });
	};
}

const has_table_name = bodyDataHas("table_name");
const has_capacity = bodyDataHas("capacity");

async function tableExists(req, res, next) {
	const { table_id } = req.params;
	const table = await service.read(table_id);

	if (table) {
		res.locals.table = table;
		console.log(table);
		next();
	} else {
		next({ status: 404, message: `No such table: ${table_id}` });
	}
}

async function tableIsValid(req, res, next) {
	const { table_id } = req.params;
	const currentTable = await service.read(table_id);
	const reservation = res.locals.reservation;
	if (reservation.people > currentTable.capacity) {
		return next({
			status: 400,
			message: "Table does not have enough capacity for reservation.",
		});
	}

	if (currentTable.reservation_id) {
		return next({ status: 400, message: "Table occupied." });
	}

	next();
}

function isValidTableName(req, res, next) {
	const { data = {} } = req.body;
	if (data["table_name"].length < 2) {
		return next({ status: 400, message: `table_name length is too short.` });
	}
	next();
}

function isValidNumber(req, res, next) {
	const { data = {} } = req.body;
	if ("capacity" in data) {
		if (data["capacity"] === 0 || !Number.isInteger(data["capacity"])) {
			return next({ status: 400, message: `capacity must be a number.` });
		}
	}
	next();
}

function isOccupied(req, res, next) {
	if (res.locals.table.reservation_id) {
		next();
	} else {
		next({
			status: 400,
			message: `Table is not occupied`,
		});
	}
}

function isBooked(req, res, next) {
	if (res.locals.reservation.status === "booked") {
		next();
	} else {
		// if it is seated:
		next({
			status: 400,
			message: `Reservation is ${res.locals.reservation.status}.`,
		});
	}
}

//CRUD

async function list(req, res) {
	const data = await service.list(req.query.date);

	res.json({
		data,
	});
}

async function create(req, res) {
	const data = await service.create(req.body.data);
	res.status(201).json({
		data: data,
	});
}

async function read(req, res) {
	const data = res.locals.reservation;
	res.status(200).json({
		data,
	});
}

async function update(req, res, next) {
	const { reservation_id } = req.body.data;
	const { table_id } = req.params;
	let data = await service.update(table_id, reservation_id);
	res.status(200).json({ data });
}

async function finish(req, res) {
	const data = await service.finish(res.locals.table);
	res.status(200).json({ data });
}

module.exports = {
	create: [
		has_table_name,
		has_capacity,
		isValidTableName,
		isValidNumber,
		asyncErrorBoundary(create),
	],
	read: [tableExists, asyncErrorBoundary(read)],
	list: [asyncErrorBoundary(list)],
	update: [
		tableExists,
		hasReservationId,
		asyncErrorBoundary(reservationExists),
		asyncErrorBoundary(tableIsValid),
		isBooked,
		asyncErrorBoundary(update),
	],
	finish: [tableExists, isOccupied, asyncErrorBoundary(finish)],
};
