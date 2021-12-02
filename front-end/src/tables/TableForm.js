import React from "react";

/**
 * Defines the Reservation Form
 * @param handleCancel
 * handles cancel button for table
 * @param handleSubmit
 * handle submit button to create new table
 * @param setTable
 * prop passed from CreateTable
 * @param table
 * prop passed from CreateTable
 * @returns {JSX.Element}
 * Table form with buttons
 */

function CreateTable({ handleCancel, handleSubmit, table, setTable }) {
	const handleChange = ({ target }) => {
		setTable({
			...table,
			[target.name]: target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
        table.capacity = Number(table.capacity);
		handleSubmit(table);
	};

	return (
		
			<form onSubmit={onSubmit}>
				<div className="form-row justify-content-center">
					<div className="form-group col-4">
						<label htmlFor="table_name">Table name</label>
						<input
							id="table_name"
							type="text"
							name="table_name"
							min={"2"}
							onChange={handleChange}
							value={table.table_name}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group col-4">
						<label htmlFor="capacity">Capacity</label>
						<input
							id="capacity"
							type="number"
							name="capacity"
							min={"1"}
							onChange={handleChange}
							value={table.capacity}
							required
							className="form-control"
						/>
					</div>
				</div>
			
			<div className="row justify-content-md-center">
				<button
					className="btn btn-sm btn-outline mr-2"
					type="button"
					style={{ color: "#88439a" }}
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button className="btn btn-sm btn-purple" type="submit" style={{color: 'white'}}>
					Submit
				</button>
			</div>
		</form>
	);
}

export default CreateTable;
