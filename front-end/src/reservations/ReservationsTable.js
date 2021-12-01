import React from "react";
import ReservationList from "./ReservationList";

/**
 * Defines the Reservation Table
 * @param reservations
 * prop passed from Dashboard
 * @param onCancel
 * prop passed from Dashboard
 * @returns {JSX.Element}
 * Table headers and mapped reservations (rows)
 */

function ReservationTable({ reservations, onCancel }) {

	
	const reservationList = reservations.map((reservation) => (
		<ReservationList
			key={reservation.reservation_id}
			reservation={reservation}
			onCancel={onCancel}
		/>
	));


	return (
		<div>
			<div className="table">
				<h3>Reservations</h3>
				<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">First Name</th>
							<th scope="col">Last Name</th>
							<th scope ="col">Mobile</th>
							<th scope="col">Date</th>
							<th scope="col">Time</th>
							<th scope="col">People</th>
							<th scope="col">Status</th>
							<th scope="col">Seat</th>
							<th scope="col">Edit</th>
							<th scope="col">Cancel</th>
						</tr>
					</thead>
					{reservationList}
				</table>
			</div>
		</div>
	);
}

export default ReservationTable;
