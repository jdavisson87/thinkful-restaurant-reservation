import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Containers/dashboard/Dashboard';
import Search from './Containers/Search/Search';
import NotFound from './ErrorHandlers/NotFound';
import NewReservationCtr from './Containers/NewReservation/NewReservationCtr';
import { today } from './utils/date-time';

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
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path="/reservations/new">
        <NewReservationCtr />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path="/search">
        <Search />
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
