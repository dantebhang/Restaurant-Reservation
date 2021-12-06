import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ReservationTable from "../reservations/ReservationsTable";
import ErrorAlert from "../layout/errors/ErrorAlert";

/**
 * Defines the /search page.
 * Makes an API call to list all reservations under an existing mobile number
 * @returns {JSX.Element}
 * Header and mobile search bar
 */

function SearchMobile() {
	const [reservations, setReservations] = useState([]);
	const [mobile, setMobile] = useState("");
	const [display, setDisplay] = useState(false);
	const [error, setError] = useState(null);

	function changeHandler({ target: { value } }) {
		setMobile(value);
	}

	function search() {
		const abortController = new AbortController();
		setDisplay(false);
		listReservations({ mobile_number: mobile }, abortController.signal)
			.then(setReservations)
			.then(() => setDisplay(true))
			.catch(setError);
			return () => abortController.abort();
	}

	function submitHandler(event) {
		event.preventDefault();
		search();
	}
	

	return (
		<div>
			<h1 className="text-center my-4">Search Reservations</h1>
			<ErrorAlert error={error} />
			<form onSubmit={submitHandler}>
				<div className="row justify-content-center">
					<div className="form-group col-md-4 col-sm-12">
						<label htmlFor="mobile_number"></label>
						<div className="input-group">
							<input
								id="mobile_number"
								type="tel"
								name="mobile_number"
								placeholder="Enter a customer's mobile number"
								onChange={changeHandler}
								className="form-control"
							/>
							<div className="input-group-append">
								<button
									className="btn btn-sm btn-purple"
									style={{ color: "white" }}
									type="submit"
								>
									Find
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			{display && (
				<div>
					{reservations.length ? (
						<ReservationTable reservations={reservations} />
					) : (
						<h4>No reservations found</h4>
					)}
				</div>
			)}
		</div>
	);
}

export default SearchMobile;
