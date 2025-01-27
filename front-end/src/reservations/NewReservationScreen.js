import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { createReservation, readReservation, editReservation } from "../utils/api";

import formatReservationDate from '../utils/format-reservation-date';
import formatReservationTime from '../utils/format-reservation-time';

import NewReservationForm from "./NewReservationForm";

function NewReservationScreen() {
    
    const { reservation_id } = useParams();
    const history = useHistory();

    const [error, setError] = useState(null);
    const [closedOnTuesdaysError, setClosedOnTuesdaysError] = useState(null);
    const [pastDateError, setPastDateError] = useState(null);
    const [businessHoursError, setBusinessHoursError] = useState(null);
    const [mobileError, setMobileError] = useState(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "10:30",
        people: 1,
        status: "booked",
    });

    useEffect(() => {
        async function loadReservation() {
          if (reservation_id) {
            const abortController = new AbortController();
            setError(null);
            readReservation(reservation_id, abortController.signal)
              .then(formatReservationDate)
              .then(formatReservationTime)
              .then(setFormData)
              .catch(setError);
            return () => abortController.abort();
          }
        }
    
        loadReservation();
      }, [reservation_id]);

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
        let validate_mobile_number = formData.mobile_number;
        const regex = new RegExp(/\d{3}-\d{3}-\d{4}/);
        if (regex.test(validate_mobile_number) === false) {
            setMobileError({
                message: "Mobile number must be in correct format: 123-456-7890."
            });
        }
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
            if (reservation_id) {
                editReservation(formData, abortController.signal)
                    .then(() => {
                        history.push(`/dashboard/?date=${formData.reservation_date}`); 
                    })
                    .catch()
                    return () => abortController.abort(); 
            } else {
                await createReservation(formData, abortController.signal)
                    .then(() => {
                        history.push(`/dashboard/?date=${formData.reservation_date}`);
                    })
                    .catch();
                    return () => abortController.abort();
            }
        }

    };

    return (
        <div>
            <h1>{reservation_id ? "Edit Reservation" : "Create Reservation"}</h1>
            <ErrorAlert error={error} />
            <ErrorAlert error={closedOnTuesdaysError} />
            <ErrorAlert error={pastDateError} />
            <ErrorAlert error={businessHoursError} />
            <ErrorAlert error={mobileError} />
            <NewReservationForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewReservationScreen;