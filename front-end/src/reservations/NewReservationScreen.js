import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { today } from "../utils/date-time";
import { createReservation } from "../utils/api";

import NewReservationForm from "./NewReservationForm";

function NewReservationScreen() {
    const history = useHistory();

    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "123-456-7890",
        reservation_date: today(),
        reservation_time: "",
        people: 0,
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        await createReservation(formData, abortController.signal)
            .then(() => {
                history.push(`/dashboard/?date=${formData.reservation_date}`);
            })
            .catch(setError);
            return () => abortController.abort();
    };

    return (
        <div>
            <h1>Create New Reservation</h1>
            <ErrorAlert error={error} />
            <NewReservationForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewReservationScreen;