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
			<div className="table col-md-6">
				<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>TableName</th>
							<th>Capacity</th>
							<th>Free/Occupied</th>
						</tr>
					</thead>
					{tableList}
				</table>
			</div>
		</div>
	);
}

export default TablesTable;
