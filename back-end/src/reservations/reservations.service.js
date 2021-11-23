const knex = require("../db/connection");

function list(date, mobile_number) {
	if (date) {
		return knex("reservations")
			.select("*")
			.where({ reservation_date: date })
			.orderBy("reservation_time", "asc");
	}
	if (mobile_number) {
		return knex("reservations")
			.select("*")
			.where("mobile_number", "like", `${mobile_number}%`);
	}
	return knex("reservations").select("*");
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

module.exports = {
	list,
	create,
	read,
};
