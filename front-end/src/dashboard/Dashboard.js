import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables, finishTable, cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";
import ReservationsTable from "../reservations/ReservationsTable";
import TablesTable from "../tables/TablesTable";
import DashButtons from "./Dashbuttons";
import moment from "moment";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 * loads dashboard page with reservation and table tables
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
			.then(setReservations)
			.catch(setReservationsError);

		listTables().then(setTables);
		return () => abortController.abort();
	}

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

	function onCancel(reservation_id) {
		cancelReservation(reservation_id)
			.then(loadDashboard)
			.catch(setReservationsError);
	}
	const formatDate = moment(date).format("MMMM D Y");

	return (
		<main>
			<div className="row my-4 justify-content-center">
				<DashButtons date={date} />
				<h4 className="mx-3"> {formatDate}</h4>
			</div>
			<ErrorAlert error={reservationsError} />
			<div className="d-flex justify-content-center">
				<div className="col">
					<ReservationsTable onCancel={onCancel} reservations={reservations} />
					<TablesTable tables={tables} onFinish={onFinish} />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
