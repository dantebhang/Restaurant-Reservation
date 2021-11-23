const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("../reservations/reservations.service");

// VALIDATION MIDDLEWARE
const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id", "people"];

const REQUIRED_PROPERTIES = ["table_name", "capacity"];

//Checks id data is present
const hasData = (req, res, next) => {
	const { data } = req.body;
	if (data) {
		return next();
	}
	next({
		status: 400,
		message: `data is required`,
	});
};

// Checks if properties are valid
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

// Checks if it has all the required properties
const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

//Check if table exists
const tableExists = async (req, res, next) => {
	const { tableId } = req.params;
	const table = await service.read(Number(tableId));

	//if table exists move on
	if (table) {
		res.locals.table = table;
		res.locals.tableId = tableId;
		console.log("foo")
		next();
	} else {
		//return error if table doesn't exist
		next({
			status: 404,
			message: `Table_id ${tableId} not found.`,
		});
	}
};

// async function tableExists(req, res, next) {
// 	const {tableId} = req.params.table_id;
// 	const table = await service.read(Number(tableId));
// 	console.log("Table Exists",table)
// 	if (table) {
// 		res.locals.table = table;
// 		res.locals.tableId = table_id;
// 		console.log("foo")
// 		next();
// 	} else {
// 		next({ status: 404, message: `No such table: ${tableId}` });
// 	}
// }

// Check if table has name
const hasValidName = (req, res, next) => {
	const { table_name } = req.body.data;

	if (table_name.length < 2) {
		//return error if table name is less than 2 characters
		return next({
			status: 400,
			message: `The table_name '${table_name}' must be at least 2 characters long.`,
		});
	}
	return next();
};

// Check if capacity is at least one
const hasValidCapacity = (req, res, next) => {
	const { capacity } = req.body.data;

	// check that capacity is a number AND greater than 0
	if (capacity > 0 && Number.isInteger(capacity)) {
		return next();
	}
	next({
		status: 400,
		message: `Table capacity '${capacity}' must be a number greater than 0.`,
	});
};

// Checks id reservation_id is present
const hasReservationId = (req, res, next) => {
	const { reservation_id } = req.body.data;

	if (reservation_id) {
		return next();
	}
	next({
		status: 400,
		message: `reservation_id is required`,
	});
};

// Check if reservation_id exists
const reservationIdExists = async (req, res, next) => {
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

async function reservationIsBooked(req, res, next) {
	const { reservation } = res.locals;
	if (reservation.status !== "seated") {
		return next();
	}
	next({
		status: 400,
		message: `Reservation is already 'seated'`,
	});
}

function tableIsBigEnough(req, res, next) {
	const { table, reservation } = res.locals;
	if (table.capacity >= reservation.people) {
		return next();
	}
	next({
		status: 400,
		message: `Table with id: ${table.table_id} does not have the capacity to seat this reservation: capacity must be at least ${reservation.people}`,
	});
}

function tableIsFree(req, res, next) {
	const { table } = res.locals;
	if (!table.reservation_id) {
		return next();
	}
	next({
		status: 400,
		message: `Table with id: ${table.table_id} is already occupied`,
	});
}

// function occupyTable(req, res, next) {
// 	const table = res.locals.table;
// 	console.log("RIGHT HERE", table)
// 	//const reservation_id = res.locals.table.reservation_id;
// 	//table.reservation_id = reservation_id;
// 	//res.locals.resId = reservation_id;
// 	res.locals.resStatus = "seated";
// 	if (res.locals.table.reservation_id) {
// 		console.log("OR HERE", table)
// 		return next();
// 	} else {
// 		next({
// 			status: 400,
// 			message: `Table with id: ${table.table_id} could not be assigned reservation id ${table.reservation_id}`,
// 		});
// 	}
// }

function isOccupied(req, res, next) {
	const table = res.locals.table;
	console.log(table);
	if (res.locals.table.reservation_id) {
		next();
	} else {
		next({
			status: 400,
			message: `Table is not occupied`,
		});
	}
}

async function occupy(req, res) {
	const table = res.locals.table;
	const data = await service.occupy(res.locals.table);
	res.json({ data });
}

// CRUD FUNCTIONS

const create = async (req, res) => {
	const data = await service.create(req.body.data);
	res.status(201).json({ data });
};

const list = async (req, res) => {
	const data = await service.list();
	res.json({ data });
};

const read = async (req, res) => {
	const data = res.locals.table;
	res.json({ data });
};

async function update(req, res) {
	const { table, resId, resStatus } = res.locals;
	const updatedTable = { ...table };
	const data = await service.occupy(updatedTable, resId, resStatus);
	res.json({ data });
}

module.exports = {
	create: [
		hasData,
		hasOnlyValidProperties,
		hasRequiredProperties,
		hasValidName,
		hasValidCapacity,
		asyncErrorBoundary(create),
	],
	list: asyncErrorBoundary(list),
	read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
	update: [
		hasData,
		hasReservationId,
		asyncErrorBoundary(reservationIdExists),
		//asyncErrorBoundary(tableExists),
		tableExists,
		asyncErrorBoundary(reservationIsBooked),
		tableIsBigEnough,
		tableIsFree,
		//occupyTable,
		isOccupied,
		occupy,
		asyncErrorBoundary(update),
	],
	//update: [tableExists, isOccupied, occupy],
};
