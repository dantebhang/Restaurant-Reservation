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
		const abortController = new AbortController();
		readReservation(reservation_id, abortController.signal).then(
			setReservation,
		);
		return () => abortController.abort();
	}, [reservation_id]);

	function edit(reservation_id) {
		updateReservation(reservation_id).then(() => {
			history.push(`/dashboard?date=${reservation.reservation_date}`);
		});
	}

	function cancel() {
		history.goBack();
	}

	if (!reservation.reservation_id) {
		return <>Loading...</>;
	}

	return (
		<div>
			<h1 className="my-4 text-center">Edit Reservation </h1>
			<ReservationForm
				initialReservation={reservation}
				handleCancel={cancel}
				handleSubmit={edit}
			/>
		</div>
	);
}

export default EditReservation;
