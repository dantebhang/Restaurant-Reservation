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
				<h4 className="mt-5">Tables</h4>
				<table className="table table-hover table-borderless">
				<thead className="thead" style={{ color: '#88439a'}}>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Table Name</th>
							<th scope="col">Capacity</th>
							<th scope="col">Status</th>
							<th scope="col">Reservation ID</th>
							<th scope="col">Done</th>
						</tr>
					</thead>
					{tableList}
				</table>
			</div>
		</div>
	);
}

export default TablesTable;
