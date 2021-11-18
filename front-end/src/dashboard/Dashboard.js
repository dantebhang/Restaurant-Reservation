import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservations/ReservationList";
import DashButtons from "./Dashbuttons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}


	const reservationList = reservations.map((reservation) => (
		<ReservationList key={reservation.reservation_id} reservation={reservation} />
	));

	return (
		<main>
			<h1>Dashboard</h1>
			<div className="d-md-flex mb-3">
				<h4 className="mb-0">Reservations for {date}</h4>
			</div>
			<ErrorAlert error={reservationsError} />
      <DashButtons date={date} />
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Phone</th>
						<th scope="col">Date</th>
						<th scope="col">Time</th>
						<th scope="col">People</th>
					</tr>
				</thead>
				{reservationList}
			</table>
		</main>
	);
}

export default Dashboard;
