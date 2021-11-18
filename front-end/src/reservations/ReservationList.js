import React from "react";

function ReservationList({ reservation }) {
	return (
		<tbody>
			<tr>
				<th scope="row">{reservation.reservation_id}</th>
				<td>
					{reservation.last_name}, {reservation.first_name}
				</td>
				<td>{reservation.mobile_number}</td>
				<td>{reservation.reservation_date}</td>
				<td>{reservation.reservation_time}</td>
				<td>{reservation.people}</td>
			</tr>
		</tbody>
	);
}

export default ReservationList;
