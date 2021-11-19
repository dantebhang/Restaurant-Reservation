import React from "react";

function ReservationForm({
	handleCancel,
	handleSubmit,
	reservation,
	setReservation,
}) {

	const handleChange = ({ target }) => {
		setReservation({
			...reservation,
			[target.name]: target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		handleSubmit();
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor="first_name">
					First name
					<input
						id="first_name"
						name="first_name"
						onChange={handleChange}
						value={reservation.first_name}
						required
					/>
				</label>
				<br></br>
				<label htmlFor="last_name">
					Last name
					<input
						id="last_name"
						name="last_name"
						onChange={handleChange}
						value={reservation.last_name}
						required
					/>
				</label>
				<br></br>
				<label htmlFor="mobile_number">
					Mobile number
					<input
						id="mobile_number"
						name="mobile_number"
						placeholder="000-000-0000"
						minLength="7"
						maxLength="12"
						onChange={handleChange}
						value={reservation.mobile_number}
						required
					/>
				</label>
				<br></br>
				<label htmlFor="reservation_date">
					Reservation date
					<input
						type="date"
						name="reservation_date"
						onChange={handleChange}
						value={reservation.reservation_date}
						required
					/>
				</label>
				<br></br>
				<label htmlFor="reservation_time">
					Reservation Time
					<input
						type="time"
						name="reservation_time"
						onChange={handleChange}
						value={reservation.reservation_time}
						required
					/>
				</label>
				<br></br>
				<label htmlFor="people">
					Party Size
					<input
						id="people"
						name="people"
						onChange={handleChange}
						value={reservation.people}
						required
					/>
				</label>
				<br></br>
				<button type="button" onClick={handleCancel}>
					Cancel
				</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default ReservationForm;
