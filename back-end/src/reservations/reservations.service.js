const knex = require("../db/connection");

function list(date) {
	return knex("reservations")
		.where("reservation_date", date)
		.whereNotIn("status", ["finished", "cancelled"])
		.orderBy("reservation_time");
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation)
		.returning("*")
		.then((newReservation) => newReservation[0]);
}

function read(reservation_id) {
	return knex("reservations")
		.select()
		.where({ reservation_id: reservation_id })
		.first();
}

function update(reservation) {
	return knex("reservations")
		.where({ reservation_id: reservation.reservation_id })
		.update(reservation, "*")
		.then((records) => records[0]);
}

function validStatus(reservation) {
	if (
		["booked", "seated", "finished", "cancelled"].includes(reservation.status)
	) {
		return reservation;
	}
	const error = new Error(`Invalid status:"${reservation.status}"`);
	error.status = 400;
	throw error;
}

function status(reservation) {
	update(reservation);
	return validStatus(reservation);
}

module.exports = {
	list,
	create,
	read,
	status,
};
