import React from "react";
import ReservationList from "./ReservationList";

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
			<div className="table col-md-6">
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Phone</th>
							<th>Date</th>
							<th>Time</th>
							<th>People</th>
							<th>Status</th>
						</tr>
					</thead>
					{reservationList}
				</table>
			</div>
		</div>
	);
}

export default ReservationTable;
