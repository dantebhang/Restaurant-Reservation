import React from "react";

/**
 * Lists all rows for tables
 * If they are occupied a finish button will display to free the table
 * @param onFinish
 * prop passed from Dashboard which makes an API call to update table once free
 * @param table
 * prop passed from TablesTable to map each row
 * @returns {JSX.Element}
 * tables row and finish button displayed if applicable
 */

function TableList({ onFinish, table = [] }) {
	function finishHandler({ target }) {
		const tableId = target.dataset.tableIdFinish;
		if (
			window.confirm(
				"Is this table ready to seat new guests? This cannot be undone.",
			)
		) {
			onFinish(tableId);
		}
	}

	const finishButton = table.reservation_id ? (
		<button
			className="btn btn-sm btn-outline-secondary"
			type="button"
			data-table-id-finish={table.table_id}
			data-reservation-id-finish={table.reservation_id}
			onClick={finishHandler}
		>
			Finish
		</button>
	) : (
		""
	);

	return (
		<tbody>
			<tr>
				<td className="border-top-0">{table.table_id}</td>
				<td className="border-top-0">{table.table_name}</td>
				<td className="border-top-0">{table.capacity}</td>
				<td className="border-top-0" data-table-id-status={table.table_id}>
					<>{table.reservation_id ? "Occupied" : "Free"}</>
				</td>
				<td className="border-top-0">
					{finishButton}
				</td>
			</tr>
		</tbody>
	);
}

export default TableList;
