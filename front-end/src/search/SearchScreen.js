import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ListReservations from "../reservations/ListReservations";
import SearchForm from "./SeachForm";
import ErrorAlert from "../errors/ErrorAlert";

function SearchScreen() {
    const [search, setSearch] = useState({ mobile_number: "" });
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    function handleChange({ target: { name, value } }) {
        setSearch((previousSearch) => ({
          ...previousSearch,
          [name]: value,
        }));
      } 

    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        listReservations(search, abortController.signal)
            .then(setReservations)
            .catch(setError);
        return () => abortController.abort();
    }

    return (
        <div>
            <h1>Search Reservation</h1>
            <ErrorAlert error={error} />
            <SearchForm search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
            <ListReservations reservations={reservations} />
        </div>
    );
}

export default SearchScreen;