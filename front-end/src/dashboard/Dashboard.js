import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../errors/ErrorAlert";
import ListReservations from "../reservations/ListReservations";

import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();
  const query = useQuery().get("date");
  if (query) date = query;

  const handlePreviousDateClick = () => {
      history.push(`dashboard?date=${previous(date)}`);
    };

  const handleTodayDateClick = () => {
      history.push(`dashboard?date=${today()}`);
  }
  
  const handleNextDateClick = () => {
      history.push(`dashboard?date=${next(date)}`);
    };

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      
      <h4 className="mb-0">Reservations for {date}</h4>
            <button
                type="button"
                className="btn btn-primary mr-2"
                data-testid="previous-date"
                onClick={handlePreviousDateClick}
            >
                Previous
            </button>

            <button
                type="button"
                className="btn btn-primary mr-2"
                data-testid="today-date"
                onClick={handleTodayDateClick}
            >
                Today
            </button>

            <button
                type="button"
                className="btn btn-primary mr-2"
                data-testid="next-date"
                onClick={handleNextDateClick}
            >
                Next
            </button>


      <ListReservations reservations={reservations} />
    </main>
  );
}

export default Dashboard;
