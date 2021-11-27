import React, { useState } from "react";
import { listReservations } from "../utils/api";
//import ReservationList from "../reservations/ReservationList";
import ReservationTable from "../reservations/ReservationsTable";
import ErrorAlert from "../layout/errors/ErrorAlert";

function SearchMobile() {
	const [reservations, setReservations] = useState([]);
	const [mobile, setMobile] = useState("");
	const [results, setResults] = useState(false);
	const [error, setError] = useState(null);

	function changeHandler({ target: { value } }) {
		setMobile(value);
	}

	function search() {
		setResults(false);
		listReservations({ mobile_number: mobile })
			.then(setReservations)
			.then(() => setResults(true))
			.catch(setError);
	}

	function submitHandler(event) {
		event.preventDefault();
		search();
	}

	// const reservationList = reservations.map((reservation) => (
	// 	<ReservationList reservation={reservation} />
	// ));

	return (
		<div>
			<h1>Search Reservations</h1>
			<ErrorAlert error={error}/>
			<form onSubmit={submitHandler}>
				<div className="row">
					<label htmlFor="mobile_number">Mobile Number:</label>
					<br />
					<input
						id="mobile_number"
						type="text"
						name="mobile_number"
						placeholder="Enter a customer's mobile number"
						onChange={changeHandler}
					></input>
					<button className="btn btn-primary" type="submit">
						Find
					</button>
				</div>
			</form>
			{results && <ReservationTable reservations={reservations} />}
		</div>
	);
}

export default SearchMobile;
