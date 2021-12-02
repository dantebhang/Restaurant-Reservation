import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/errors/ErrorAlert";
import TableForm from "./TableForm";

/**
 * Defines the /tables/new page.
 * Makes an API call to create a new table
 * @returns {JSX.Element}
 * Header and table form component
 */

function CreateTable() {
	const history = useHistory();
	const [error, setError] = useState(null);

	const initialFormState = {
		table_name: "",
		capacity: "",
	};

	const [table, setTable] = useState({ ...initialFormState });

	const handleCancel = () => {
		history.goBack();
	};

	const handleSubmit = (table) => {
		const abortController = new AbortController();
		createTable(table)
			.then(() => {
				history.push(`/dashboard`);
			})
			.catch(setError);
		return () => abortController.abort();
	};

	return (
		<>
			<h1 className="my-4 text-center">Create a Table</h1>
			<ErrorAlert error={error} />
			<TableForm 
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                table={table}
                setTable={setTable}
                />
		</>
	);
}

export default CreateTable;
