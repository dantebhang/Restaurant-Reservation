import React, { useState } from "react";
import { listReservations } from "../utils/api";
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

	return (
		<div>
			<h1>Search Reservations</h1>
			<ErrorAlert error={error} />
			<form onSubmit={submitHandler}>
				<div className="row">
					<div className="form-group col-md-4 col-sm-12">
						<label htmlFor="mobile_number">Mobile Number</label>
						<div className="input-group">
							<input
								id="mobile_number"
								type="text"
								name="mobile_number"
								placeholder="Enter a customer's mobile number"
								onChange={changeHandler}
								className="form-control"
							/>
							<div className="input-group-append">
								<button className="btn btn-primary" type="submit">
									<span className="oi oi-magnifying-glass">Find</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div>{results && <ReservationTable reservations={reservations} />}</div>
		</div>
	);
}

export default SearchMobile;
