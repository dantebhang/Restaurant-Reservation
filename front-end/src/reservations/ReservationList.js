import React from "react";
import { Link } from "react-router-dom";

function ReservationList({ reservation }) {
	const reservation_id = reservation.reservation_id;

	return (
		<tbody>
			<tr>
				<td>{reservation.reservation_id}</td>
				<td>
					{reservation.last_name}, {reservation.first_name}
				</td>
				<td>{reservation.mobile_number}</td>
				<td>{reservation.reservation_date}</td>
				<td>{reservation.reservation_time}</td>
				<td>{reservation.people}</td>
				<td data-reservation-id-status={reservation.reservation_id}>
					{reservation.status}
				</td>
				{reservation.status === "booked" ? (
					<td>
						<Link to={`/reservations/${reservation_id}/seat`}>
							<button
								className="btn btn-secondary"
								href={`/reservations/${reservation_id}/seat`}
							>
								Seat
							</button>
						</Link>
					</td>
				) : (
					""
				)}
			</tr>
		</tbody>
	);
}

export default ReservationList;
