import React from "react";
import TableList from "./TableList";

/**
 * Defines the Tables Table
 * @param onFinish
 * prop passed from Dashboard
 * @param tables
 * prop passed from Dashboard which makes an API call to list tables
 * @returns {JSX.Element}
 * table headers and maps table rows
 */

function TablesTable({ onFinish, tables }) {
	const tableList = tables.map((table) => (
		<TableList key={table.table_id} table={table} onFinish={onFinish} />
	));

	return (
		<div>
			
			<div className="table">
				<h3>Tables</h3>
				<table className="table table-hover">
					<thead className="thead-dark">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Table Name</th>
							<th scope="col">Capacity</th>
							<th scope="col">Status</th>
							<th scope="col">Reservation ID</th>
							<th scope="col">Finish</th>
						</tr>
					</thead>
					{tableList}
				</table>
			</div>
		</div>
	);
}

export default TablesTable;
