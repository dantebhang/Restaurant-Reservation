import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/errors/ErrorAlert";


function CreateReservation() {
	const history = useHistory();
	const [error, setError] = useState(null)

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
			.catch(setError)

	};

	return (
		<div>
			<h1>Make a Reservation</h1>
			<ErrorAlert error={error} />
			<ReservationForm
				handleSubmit={create}
				handleCancel={cancel}
				initialReservation={initialFormState}
			/>
		</div>
	);
}

export default CreateReservation;
