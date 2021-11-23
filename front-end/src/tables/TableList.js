import React from "react";

function TableList({ table }) {

    //change conditional to {table.status} ?

	return (
		<tbody>
			<tr>
				<td className="border-top-0">{table.table_id}</td>
				<td className="border-top-0">{table.table_name}</td>
				<td className="border-top-0">{table.capacity}</td>
				<td className="border-top-0" data-table-id-status={table.table_id}>
					{table.reservation_id ? "Occupied" : "Free"} 
				</td>

			</tr>
		</tbody>
	);
}

export default TableList;
