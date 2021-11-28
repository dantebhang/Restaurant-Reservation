import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";
import ReservationForm from "./ReservationForm";

function CreateReservation() {
	const history = useHistory();
	const [error, setError] = useState(null);

	const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};

	const [reservation, setReservation] = useState({ ...initialFormState });

	function handleCancel() {
		history.goBack();
	};

	function handleCreate(reservation) {
		createReservation(reservation)
			.then(() => {
				history.push(`/dashboard?date=${reservation.reservation_date}`);
			})
			.catch(setError);
	};

	return (
		<div>
			<h1>Make a Reservation</h1>
			<ErrorAlert error={error} />
			<ReservationForm
				handleSubmit={handleCreate}
				handleCancel={handleCancel}
				reservation={reservation}
				setReservation={setReservation}
			/>
		</div>
	);
}

export default CreateReservation;
