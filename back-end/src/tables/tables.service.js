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

function read(table_id) {
	return knex("tables").where("table_id", table_id).first();
}

// updates table and reservation status after being assigned a reservation
function update(table_id, reservation_id) {
	return knex.transaction(async (transaction) => {
		await knex("reservations")
			.where({ reservation_id })
			.update({ status: "seated" })
			.transacting(transaction);

		return knex("tables")
			.where({ table_id })
			.update({ reservation_id }, "*")
			.transacting(transaction)
			.then((records) => records[0]);
	});
}

//updates table when finished seating reservation
function finish(table) {
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
	update,
	finish,
};
