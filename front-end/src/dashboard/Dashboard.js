import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";
import ReservationsTable from "../reservations/ReservationsTable";
import TablesTable from "../tables/TablesTable";
import DashButtons from "./Dashbuttons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [tables, setTables] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then((data) => {
				console.log(data);
				return data;
			})
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	console.log("reservations", reservations);
	useEffect(loadTable, []);

	function loadTable() {
		const abortController = new AbortController();
		setReservationsError(null);
		listTables(abortController.signal)
			.then(setTables)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	function onFinish(table_id) {
		finishTable(table_id).then(loadDashboard).catch(setReservationsError);
	}

	return (
		<main>
			<h1>Dashboard</h1>
			<div className="d-md-flex mb-3">
				<h4 className="mb-0">Reservations for {date}</h4>
			</div>
			<ErrorAlert error={reservationsError} />
			<DashButtons date={date} />
			<div className="row">
				<ReservationsTable reservations={reservations} />
				<TablesTable tables={tables} onFinish={onFinish} />
			</div>
		</main>
	);
}

export default Dashboard;
