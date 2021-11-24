import React from "react";
import TableList from "./TableList";

function TablesTable({onFinish, tables}) {

    const tableList = tables.map((table) => (
		<TableList key={table.table_id} table={table} onFinish={onFinish}/>
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
