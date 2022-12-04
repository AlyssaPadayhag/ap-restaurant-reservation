// /reservations/:reservation_id/seat page

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { listTables, updateTable, readReservation } from "../utils/api";

import SeatReservationForm from "./SeatReservationForm";

function SeatReservationScreen() {

const { reservation_id } = useParams();
const history = useHistory();

const [error, setError] = useState(null);
const [capacityError, setCapacityError] = useState(null);
const [reservation, setReservation] = useState([]);
const [tables, setTables] = useState([]);
const [currentTable, setCurrentTable] = useState({ table_id: "", capacity: "" });

useEffect(loadTables, [reservation_id]);

function loadTables() {
    const abortController = new AbortController();
    setError(null);
    readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .catch(setError)
    listTables(abortController.signal)
        .then(setTables)
        .catch(setError)

    return () => abortController.abort();
}

function handleChange({ target }) {
    setCurrentTable({ [target.name]: target.value });
  }

const handleSubmit = (event) => {
    event.preventDefault();

    const { capacity } = currentTable;
    const { people } = reservation;

    if (capacity < people) {
        setCapacityError({
            message: "TEST"
        });
    }

    const abortController = new AbortController();
    updateTable( parseInt(currentTable.table_id), reservation_id, abortController.signal)
        .then(() => { history.push("/dashboard") })
        .catch(setError);
    return () => abortController.abort();
}

const currentReservation = (
    <div key={reservation.reservation_id}>
        <h3>Date: {reservation.reservation_date} Time: {reservation.reservation_time}</h3>
        <h3>Name: {reservation.last_name}, {reservation.first_name}</h3>
        <h3>Mobile number: {reservation.mobile_number}</h3>
        <h3>Number of people in party: {reservation.people}</h3>
    </div>
);

    return (
        <div>
            <h1>Seat Reservation</h1>
            <ErrorAlert error={error} />
            <ErrorAlert error={capacityError} />
            <div>{currentReservation}</div>
            <SeatReservationForm
                currentTable={currentTable}
                reservation={reservation}
                tables={tables}
                handleChange={handleChange}
                handleSubmit={handleSubmit} />
        </div>
    );
}

export default SeatReservationScreen;