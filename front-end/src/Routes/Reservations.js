import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReservationCtr from '../Containers/ReservationCtr/ReservationCtr';
import NotFound from '../ErrorHandlers/NotFound';

const ReservationRoutes = () => (
  <div>
    <Switch>
      <Route path="/reservations/new">
        <ReservationCtr />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <ReservationCtr />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default ReservationRoutes;
