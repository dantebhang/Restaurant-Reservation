import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/errors/ErrorAlert";
import {
	readReservation,
	listTables,
	readTable,
	updateTable,
} from "../utils/api";

function SeatReservation() {
	const { reservation_id } = useParams();
	const history = useHistory();

	const [reservations, setReservations] = useState([]);
	const [tables, setTables] = useState([]);
	const [selectedTable, setSelectedTable] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		readReservation(reservation_id).then(setReservations).catch(setError);
		listTables({ occupied: false }, abortController.signal)
			.then(setTables)
			.catch(setError);

		return () => abortController.abort();
	}, [reservation_id]);

	const handleSelectTable = async (event) => {
		const abortController = new AbortController();
		const id = event.target.value;
		readTable(id, abortController.signal)
			.then(setSelectedTable)
			.catch(setError);
		return () => abortController.abort();
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		await updateTable(selectedTable.table_id, reservation_id);

		history.push("/dashboard");
	};

	const handleCancel = () => {
		history.goBack();
	};

	return (
		<div>
			<h1>Seat Reservation</h1>
			<h3>
				(reservationId) - (first last name) on (resdate) at (restime) for (party
				size)
			</h3>

			<form onSubmit={onSubmit}>
				<label htmlFor="seat_reservation">
					Seat at:
					<select id="table_id" name="table_id" onChange={handleSelectTable} required></select>
                    <option defaultValue>Select a table</option>
                    {tables.map((table) => (
                        <option value={table.table_id}> {`${table.table_name} - ${table.capacity}`}</option>
                    ))}
				</label>
				<br />
				<button
					className="btn btn-secondary mr-2 cancel"
					type="button"
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default SeatReservation;
