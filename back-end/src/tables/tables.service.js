const knex = require("../db/connection");

// Create table
function create(table) {
	return knex("tables")
		.insert(table)
		.returning("*")
		.then((newTable) => newTable[0]);
}

// List tables
function list() {
	return knex("tables").select("*").orderBy("table_name");
}

// View tables
// function read(table_id) {
// 	return knex("tables as t")
// 		.leftJoin("reservations as r", "r.reservation_id", "t.reservation_id")
// 		.select(
// 			"t.table_id",
// 			"t.table_name",
// 			"t.capacity",
// 			"t.reservation_id",
// 			"r.first_name",
// 			"r.last_name",
// 			"r.mobile_number",
// 			"r.reservation_date",
// 			"r.reservation_time",
// 			"r.people",
// 			"r.status",
// 			"r.created_at as reservation_created",
// 			"r.updated_at as reservation_updated",
// 		)
// 		.where({ table_id })
// 		.then((result) => result[0]);
// }

function read(table_id) {
	return knex("tables").where("table_id", table_id).first();
}

// View reservation
function readReservation(reservation_id) {
	return knex("reservations")
		.where({ reservation_id })
		.then((result) => result[0]);
}

// View reservation by table
function readTableByReservation(reservation_id) {
	return knex("tables")
		.where({ reservation_id })
		.whereExists(knex.select("*").from("tables").where({ reservation_id }))
		.then((result) => result[0]);
}

// Update tables
// updates table after being assigned a reservation - also updates reservation status
function occupy(table) {
	return knex.transaction(async (transaction) => {
		await knex("reservations")
			.where({ reservation_id: table.reservation_id })
			.update({ status: "finished" })
			.transacting(transaction);

		return knex("tables")
			.where({ table_id: table.table_id })
			.update({ reservation_id: null }, "*")
			.transacting(transaction)
			.then((records) => records[0]);
	});
}

module.exports = {
	create,
	list,
	read,
	readReservation,
	readTableByReservation,
	occupy,
};
