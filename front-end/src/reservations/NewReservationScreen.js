import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { createReservation } from "../utils/api";

import NewReservationForm from "./NewReservationForm";

function NewReservationScreen() {
    const history = useHistory();

    const [error, setError] = useState(null);
    const [closedOnTuesdaysError, setClosedOnTuesdaysError] = useState(null);
    const [pastDateError, setPastDateError] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "a",
        last_name: "a",
        mobile_number: "123-456-7890",
        reservation_date: "",
        reservation_time: "10:30",
        people: 1,
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
        const resDay = new Date(formData.reservation_date);
        let currentDate = new Date();
        let resDate = new Date(formData.reservation_date);

        if (resDay.getUTCDay() === 2) {
            setClosedOnTuesdaysError({
                message: "Restaurant closed on Tuesdays.",
              });
        }
        if (currentDate > resDate) {
            setPastDateError({
                message: "Reservation must be in future date.",
              });
        } else {
            const abortController = new AbortController();
            await createReservation(formData, abortController.signal)
                .then(() => {
                    history.push(`/dashboard/?date=${formData.reservation_date}`);
                })
                .catch(setError);
            return () => abortController.abort();
        }

    };

    return (
        <div>
            <h1>Create New Reservation</h1>
            <ErrorAlert error={error} />
            <ErrorAlert error={closedOnTuesdaysError} />
            <ErrorAlert error={pastDateError} />
            <NewReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewReservationScreen;