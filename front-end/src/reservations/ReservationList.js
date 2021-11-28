import React from "react";
import { Link } from "react-router-dom";

function ReservationList({ reservation, onCancel }) {

	function cancelHandler({ target }) {
		const reservation_id = target.dataset.reservationIdCancel;
		if (
			reservation_id &&
			window.confirm(
				"Do you want to cancel this reservation? This cannot be undone",
			)
		) {
			onCancel(reservation_id);
		}
	}

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
				<>
					{reservation.status === "booked" ? (
						<>
							<td>
								<Link to={`/reservations/${reservation.reservation_id}/seat`}>
									<button className="btn btn-secondary">seat</button>
								</Link>{" "}
							</td>
							<td>
								<Link to={`/reservations/${reservation.reservation_id}/edit`}>
									<button className="btn btn-secondary">edit</button>
								</Link>
							</td>
							<td>
								<Link to={`/dashboard?date=${reservation.reservation_date}`}>
									<button
										className="btn btn-secondary"
										data-reservation-id-cancel={reservation.reservation_id}
										onClick={cancelHandler}
									>
										cancel
									</button>
								</Link>
							</td>
							{""}
						</>
					) : (
						""
					)}
				</>
			</tr>
		</tbody>
	);
}

export default ReservationList;
