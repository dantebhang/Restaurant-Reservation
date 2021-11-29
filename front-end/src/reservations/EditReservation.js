import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation() {
	const { reservation_id } = useParams();
	const history = useHistory();
	const [reservation, setReservation] = useState([]);

	useEffect(() => {
		readReservation(reservation_id).then(setReservation);
	}, [reservation_id]);

	function edit(reservation_id) {
		updateReservation(reservation_id).then((updatedRes) => {
			history.push(`/dashboard?date=${updatedRes.reservation_date}`);
		});
	}

	function cancel() {
		history.goBack();
	}

	const editForm = reservation.reservation_id ? ( 
		<ReservationForm
			initialReservation={reservation}
			handleCancel={cancel}
			handleSubmit={edit}
		/>
	) : (
		<p>Loading...</p>
	);

	return (
		<div>
			<h1>Edit Reservation </h1>
			{editForm}
		</div>
	);
}

export default EditReservation;
