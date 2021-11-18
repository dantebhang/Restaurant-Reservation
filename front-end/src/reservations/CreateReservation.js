import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function CreateReservation(){
    const history = useHistory();
    const [error, setError] = useState(null);

    const initialFormState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: 1,
	};

	const [reservation, setReservation] = useState({ ...initialFormState });

    const handleCancel = () => {
		setReservation({ ...initialFormState });
		history.goBack();
	};

    const handleSubmit = (event) => {
		event.preventDefault();
		createReservation(reservation)
			.then(() => {
				//setReservation({ ...initialFormState });
				history.push(`/dashboard?date=${reservation.reservation_date}`);			
			})
			.catch(setError);
	};



    return (
        <div>
            <h1>Make a Reservation</h1>
            <ErrorAlert error={error} />
            <ReservationForm 
                reservation={reservation}
                setReservation={setReservation}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                />
        </div>
        


    );

}

export default CreateReservation;