import React from "react";

function ReservationForm({
	reservation,
	setReservation,
	handleCancel,
	handleSubmit,
}) {
	const handleChange = ({ target }) => {
		setReservation({
			...reservation,
			[target.name]: target.value,
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="first_name">
					First name
					<input
						id="first_name"
						type="text"
						name="first_name"
						onChange={handleChange}
						value={reservation.first_name}
						required={true}
					/>
				</label>
				<br></br>
				<label htmlFor="last_name">
					Last name
					<input
						id="last_name"
						type="text"
						name="last_name"
						onChange={handleChange}
						value={reservation.last_name}
						required={true}
					/>
				</label>
				<br></br>
				<label htmlFor="mobile_number">
					Mobile number
					<input
						id="mobile_number"
						type="tel"
						name="mobile_number"
						pattern="([0-9]{3}(|-))?([0-9]{3}-[0-9]{4}|[0-9]{3}[0-9]{4})"
						placeholder={"123-456-7890"}
						maxLength="12"
						onChange={handleChange}
						value={reservation.mobile_number}
						required={true}
					/>
				</label>
				<br></br>
				<label htmlFor="reservation_date">
					Reservation date
					<input
						id="reservation_date"
						type="date"
						placeholder={"YYYY-MM-DD"}
						pattern="\d{4}-\d{2}-\d{2}"
						name="reservation_date"
						onChange={handleChange}
						value={reservation.reservation_date}
						required={true}
					/>
				</label>
				<br></br>
				<label htmlFor="reservation_time">
					Reservation Time
					<input
						id="reservation_time"
						type="time"
						pattern="[0-9]{2}:[0-9]{2}"
						name="reservation_time"
						onChange={handleChange}
						value={reservation.reservation_time}
						required={true}
					/>
				</label>
				<br></br>
				<label htmlFor="people">
					Party Size
					<input
						id="people"
						type="number"
						min={1}
						name="people"
						onChange={handleChange}
						value={reservation.people}
						required={true}
					/>
				</label>
				<br></br>
				<button type="cancel" onClick={handleCancel}>
					Cancel
				</button>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default ReservationForm;
