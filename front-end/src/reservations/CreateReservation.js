import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
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

	const handleCancel = () => {
		history.goBack();
	};

	const handleSubmit = (reservation) => {
		const abortController = new AbortController();
		createReservation(reservation)
			.then(() => {
				history.push(`/dashboard?date=${reservation.reservation_date}`);
			})
			.catch(setError);
			return () => abortController.abort();
	
	};

	return (
		<div>
			<h1>Make a Reservation</h1>
			<ErrorAlert error={error} />
			<ReservationForm
				handleSubmit={handleSubmit}
				handleCancel={handleCancel}
				reservation={reservation}
				setReservation={setReservation}
			/>
		</div>
	);
}

export default CreateReservation;
