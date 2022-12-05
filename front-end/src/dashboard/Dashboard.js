import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { listReservations, listTables, finishTable } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";

import ErrorAlert from "../errors/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
import ListTables from "../tables/ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

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
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);

    return () => abortController.abort();
  }

  function handleFinish({ target }) {
    const result = window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    );
    if (result) {
      const tableId = target.id;

      const abortController = new AbortController();

      finishTable(tableId, abortController.signal).then(() => {
        history.push('/');
      });
    }
  }

  return (
    <main>
      <h1 className="text-center">Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />

      <div className="text-center border border-success mb-2 p-2">
      <h3 className="mb-2">Reservations for {date}</h3>
      
      <button
                type="button"
                className="btn btn-success mr-2 mb-2"
                data-testid="previous-date"
                onClick={handlePreviousDateClick}
            >
                Previous
            </button>

            <button
                type="button"
                className="btn btn-success mr-2 mb-2"
                data-testid="today-date"
                onClick={handleTodayDateClick}
            >
                Today
            </button>

            <button
                type="button"
                className="btn btn-success mr-2 mb-2"
                data-testid="next-date"
                onClick={handleNextDateClick}
            >
                Next
            </button>
      </div>
            


      <ListReservations reservations={reservations} />
      <h3 className="text-center border border-success mb-2 p-2">Tables</h3>
      <ListTables tables={tables} handleFinish={handleFinish} />
    </main>
  );
}

export default Dashboard;
