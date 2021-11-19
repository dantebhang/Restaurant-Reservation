const knex = require("../db/connection");

function list() {
	return knex("reservations").select();
}

function listReservationsByDate(reservation_date){
    return knex("reservations")
        .where({ reservation_date })
        .orderBy("reservation_time")
}

function create(reservation) {
	return knex("reservations")
		.insert(reservation)
		.returning("*")
		.then((newReservation) => newReservation[0]);
}

module.exports = {
	list,
    listReservationsByDate,
	create,
};
