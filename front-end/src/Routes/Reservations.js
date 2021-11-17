import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewReservationCtr from '../Containers/NewReservation/NewReservationCtr';
import NotFound from '../ErrorHandlers/NotFound';

const ReservationRoutes = () => (
  <div>
    <Switch>
      <Route path="/reservations/new">
        <NewReservationCtr />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default ReservationRoutes;
