import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";

import Dashboard from "../dashboard/Dashboard";
import NewReservationScreen from "../reservations/NewReservationScreen";
import NewTableScreen from "../tables/NewTableScreen";
import SeatReservationScreen from "../tables/SeatReservationScreen";

import NotFound from "../errors/NotFound";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>

      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations/new">
        <NewReservationScreen />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/tables/new">
          <NewTableScreen />
      </Route>

      <Route path="/reservations/:reservation_id/seat" >
          <SeatReservationScreen />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

export default Routes;
