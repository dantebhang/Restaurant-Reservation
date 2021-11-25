import React from "react";
import { Link } from "react-router-dom";

function ReservationList({ reservation }) {
	const reservation_id = reservation.reservation_id;

	return (
		<tbody>
			<tr>
				<td className="border-top-0">{reservation.reservation_id}</td>
				<td className="border-top-0">
					{reservation.last_name}, {reservation.first_name}
				</td>
				<td className="border-top-0">{reservation.mobile_number}</td>
				<td className="border-top-0">{reservation.reservation_date}</td>
				<td className="border-top-0">{reservation.reservation_time}</td>
				<td className="border-top-0">{reservation.people}</td>
				<td className="border-top-0" data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
				{reservation.status === "booked" ? (
					<td className="border-top-0">
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
