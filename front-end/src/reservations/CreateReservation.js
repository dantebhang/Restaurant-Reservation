import React from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function CreateReservation() {
	const history = useHistory();

	const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	};

	function cancel() {
		history.goBack();
	};

	function create(reservation) {
		createReservation(reservation)
			.then((newRes) => {
				history.push(`/dashboard?date=${newRes.reservation_date}`);
			})

	};

	return (
		<div>
			<h1>Make a Reservation</h1>
			<ReservationForm
				handleSubmit={create}
				handleCancel={cancel}
				initialReservation={initialFormState}
			/>
		</div>
	);
}

export default CreateReservation;
