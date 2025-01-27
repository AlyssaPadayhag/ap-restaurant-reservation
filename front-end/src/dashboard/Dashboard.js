import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { listReservations, listTables, finishTable } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import useQuery from "../utils/useQuery";

import ErrorAlert from "../errors/ErrorAlert";
import ListReservations from "../reservations/ListReservations";
import ListTables from "../tables/ListTables";
import DashboardNav from "./DashboardNav";

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
    <main className="dashboard-bg">
      <h1 className="text-center page-header" id="reservations">Dashboard</h1>
      <DashboardNav />
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />

      <div className="mb-2 p-2 reservations-tables-header reservation-header-border">
      <h3 className="mb-2 text-center" >Reservations for <span id="date-length">{date}</span></h3>
      <div className="text-center">
      <button
                type="button"
                className="btn btn-secondary mr-2 mb-2"
                data-testid="previous-date"
                onClick={handlePreviousDateClick}
            >
                {"<"}
            </button>

            <button
                type="button"
                className="btn btn-light mr-2 mb-2"
                data-testid="today-date"
                onClick={handleTodayDateClick}
            >
                Today
            </button>

            <button
                type="button"
                className="btn btn-secondary mr-2 mb-2"
                data-testid="next-date"
                onClick={handleNextDateClick}
            >
                {">"}
            </button>
      </div>


        <ListReservations reservations={reservations}/>
      </div>
            
      <div className="mb-2 p-2 reservations-tables-header table-header-border">
        <h3 className="mb-2 text-center" id="tables"> Total tables in restaurant: <span id="tables-length">{tables.length}</span></h3>
        <ListTables tables={tables} handleFinish={handleFinish} />
      </div>

    </main>
  );
}

export default Dashboard;
