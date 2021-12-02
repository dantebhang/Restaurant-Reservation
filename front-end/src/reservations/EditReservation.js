import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

/**
 * Defines the reservation/edit page.
 * Makes an API call to read and update a reservation
 * @returns {JSX.Element}
 * Header and reservation form component
 */

function EditReservation() {
	const { reservation_id } = useParams();
	const history = useHistory();
	const [reservation, setReservation] = useState([]);

	useEffect(() => {
		readReservation(reservation_id).then(setReservation);
	}, [reservation_id]);

	function edit(reservation_id) {
		updateReservation(reservation_id).then(() => {
			history.push(`/dashboard?date=${reservation.reservation_date}`);
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
			<h1 className="my-4 text-center">Edit Reservation </h1>
			{editForm}
		</div>
	);
}

export default EditReservation;
