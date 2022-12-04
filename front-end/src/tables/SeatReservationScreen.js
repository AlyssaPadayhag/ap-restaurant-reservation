// /reservations/:reservation_id/seat page

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../errors/ErrorAlert";
import { listTables, updateTable, readReservation, updateReservationStatus } from "../utils/api";

import SeatReservationForm from "./SeatReservationForm";

function SeatReservationScreen() {

const { reservation_id } = useParams();
const history = useHistory();

const [error, setError] = useState(null);
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




function handleSubmit(event) {
    event.preventDefault();
    if (currentTable.table_id !== 'x') {
      const abortController = new AbortController();
      let status = "seated";
      updateReservationStatus(status, reservation_id, abortController.signal);
      updateTable(
        parseInt(currentTable.table_id),
        reservation_id,
        abortController.signal
      ).then(() => {
        history.push('/dashboard')
      })
      .catch(setError);
    }
  }

const currentReservation = (
    <div key={reservation.reservation_id}>
        <h3>Date: {reservation.reservation_date} Time: {reservation.reservation_time}</h3>
        <h3>Name: {reservation.last_name}, {reservation.first_name}</h3>
        <h3>Mobile number: {reservation.mobile_number}</h3>
        <h3>Number of people in party: {reservation.people}</h3>
    </div>
);

    if (reservation.status === 'booked') {
        return (
            <div>
                <h1>Seat Reservation</h1>
                <ErrorAlert error={error} />
                <div>{currentReservation}</div>
                <SeatReservationForm
                    currentTable={currentTable}
                    reservation={reservation}
                    tables={tables}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />
            </div>
        );
    } else {
        return (
          <div>
            <p>Reservation cannot be seated</p>
          </div>
        );
      }
}

export default SeatReservationScreen;