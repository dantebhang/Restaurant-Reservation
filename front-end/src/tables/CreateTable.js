import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

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
				history.push(`/dashboard`); //RIGHT?
			})
			.catch(setError);
		return () => abortController.abort();
	};

	return (
		<div>
			<h1>Create Table</h1>
			<ErrorAlert error={error} />
			<TableForm />
		</div>
	);
}

export default CreateTable;
