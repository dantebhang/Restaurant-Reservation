import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {readReservation, updateReservation} from "../utils/api";
import ReservationForm from "./ReservationForm";

function EditReservation(){
    const {reservation_id} = useParams();
    const history = useHistory();
    const [reservation, setReservation] = useState([]);

    useEffect(() => {
        readReservation(reservation_id).then(setReservation)
    }, [reservation_id])

    function handleEdit(reservation_id){
        updateReservation(reservation_id)
            .then((updatedRes) => {
                history.push(`/dashboard?date=${updatedRes.reservation_date}`)
            })
    }

    function handleCancel(){
        history.goBack()
    }

    return(
        <div>
            <h1>Edit Reservation </h1>
            <ReservationForm 
                reservation={reservation}
                setReservation={setReservation}
                handleCancel={handleCancel}
                handleSubmit={handleEdit}
                />
        </div>
    );
}

export default EditReservation;