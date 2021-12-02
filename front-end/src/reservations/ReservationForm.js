import React, { useState } from "react";
import ErrorAlert from "../layout/errors/ErrorAlert";
import { validateForm } from "../utils/reservations-validation";

/**
 * Defines the Reservation Form
 * @param handleCancel
 * handles cancel button for edit/create reservation
 * @param handleSubmit
 * handle submit button for edit/create reservation
 * @param initialReservation
 * passes state of blank Reservation for create or existing reservation for edit
 * @returns {JSX.Element}
 * Reservation form with buttons
 */

function ReservationForm({ handleCancel, handleSubmit, initialReservation }) {
	const [reservation, setReservation] = useState(initialReservation);
	const [errors, setErrors] = useState([]);

	const handleChange = ({ target }) => {
		setReservation((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		reservation.people = Number(reservation.people);
		const reservationErrors = validateForm(reservation);
		if (reservationErrors.length) {
			return setErrors(reservationErrors);
		} else {
			handleSubmit(reservation);
		}
	};

	const errorList = errors.map((error) => (
		<ErrorAlert key={error.message} error={error} />
	));

	

	return (
		<div>
			<form onSubmit={onSubmit}>
				{errorList}
				<div className="form-row justify-content-center">
					<div className="form-group col-4">
						<label htmlFor="first_name">First name</label>
						<input
							id="first_name"
							type="text"
							name="first_name"
							onChange={handleChange}
							value={reservation.first_name}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group col-4">
						<label htmlFor="last_name">Last name</label>
						<input
							id="last_name"
							type="text"
							name="last_name"
							onChange={handleChange}
							value={reservation.last_name}
							required
							className="form-control"
						/>
					</div>
				</div>

				<div className="form-row justify-content-center">
					<div className="form-group col-4">
						<label htmlFor="mobile_number">Mobile number</label>
						<input
							id="mobile_number"
							name="mobile_number"
							placeholder="000-000-0000"
							type="tel"
							minLength="7"
							maxLength="12"
							onChange={handleChange}
							value={reservation.mobile_number}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group col-4">
						<label htmlFor="reservation_date">Reservation date</label>
						<input
							type="date"
							name="reservation_date"
							onChange={handleChange}
							value={reservation.reservation_date}
							required
							className="form-control"
						/>
					</div>
				</div>
				<div className="form-row justify-content-center">
					<div className="form-group col-4">
						<label htmlFor="reservation_time">Reservation Time</label>
						<input
							type="time"
							name="reservation_time"
							onChange={handleChange}
							value={reservation.reservation_time}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group col-4">
						<label htmlFor="people">People</label>
						<input
							id="people"
							type="number"
							name="people"
							min={"1"}
							onChange={handleChange}
							value={reservation.people}
							required
							className="form-control"
						/>
					</div>
				</div>

				<div className="row justify-content-md-center">
					<button
						className="btn btn-sm btn-outline mr-2"
						style={{ color: "#88439a" }}
						type="button"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button className="btn btn-sm btn-purple" style={{color: 'white'}} type="submit">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;
