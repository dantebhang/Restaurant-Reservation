import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";

function SeatReservation() {
	const { reservation_id } = useParams();
	const history = useHistory();

	const [tables, setTables] = useState([]);
	const [tableId, setTableId] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		listTables().then(setTables);
	}, []);

	useEffect(() => {
		readReservation(reservation_id);
	}, [reservation_id]);

	function changeHandler({ target: { value } }) {
		setTableId(value);
	}

	const onSubmit = async (event) => {
		event.preventDefault();
		updateTable(tableId, reservation_id)
			.then(() => history.push("/dashboard"))
			.catch(setError);
	};

	const handleCancel = () => {
		history.goBack();
	};

	const tableOptions = tables.map((table) => (
		<option key={table.table_id} value={table.table_id}>
			{`${table.table_name} - ${table.capacity}`}
		</option>
	));

	return (
		<div>
			<h1>Seat Reservation</h1>
			<ErrorAlert error={error} />
			<form onSubmit={onSubmit}>
				<label htmlFor="seat_reservation">
					Seat at:
					<br />
					<select
						id="table_id"
						name="table_id"
						onChange={changeHandler}
						required
					>
						<option value="">Select a table</option>
						{tableOptions}
					</select>
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
