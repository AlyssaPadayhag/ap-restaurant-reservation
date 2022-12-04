import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { createReservation } from "../utils/api";

import NewReservationForm from "./NewReservationForm";

function NewReservationScreen() {
    const history = useHistory();

    const [closedOnTuesdaysError, setClosedOnTuesdaysError] = useState(null);
    const [pastDateError, setPastDateError] = useState(null);
    const [businessHoursError, setBusinessHoursError] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
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
                message: "Reservation date must be in future.",
              });
        }
        if (formData.reservation_time < "10:30" || formData.reservation_time > "21:30") {
            setBusinessHoursError({
                message: "Reservation time must be between 10:30am - 9:30pm"
            });
        } else {
            const abortController = new AbortController();
            await createReservation(formData, abortController.signal)
                .then(() => {
                    history.push(`/dashboard/?date=${formData.reservation_date}`);
                })
                .catch();
            return () => abortController.abort();
        }

    };

    return (
        <div>
            <h1>Create New Reservation</h1>
            <ErrorAlert error={closedOnTuesdaysError} />
            <ErrorAlert error={pastDateError} />
            <ErrorAlert error={businessHoursError} />
            <NewReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewReservationScreen;