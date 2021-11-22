import React from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/errors/ErrorAlert";
import { readReservation } from "../utils/api";

function SeatReservation() {
	const { reservation_id } = useParams();
    console.log(reservation_id)
	const history = useHistory();

    //assigns table to reservation, goes to /dashboard
	const onSubmit = (event) => {
		event.preventDefault();
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div>
			<h1>Seat Reservation</h1>
			<h3>
				(reservationId) - (tableName) on (date) at (time) for (party size)
			</h3>

			<form onSubmit={onSubmit}>
				<label htmlFor="seat_reservation">
					Seat at:
					<select id="table_id" name="table_id" required></select>
				</label>
				<br />
				<button
					class="btn btn-secondary mr-2 cancel"
					type="button"
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button class="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default SeatReservation;
