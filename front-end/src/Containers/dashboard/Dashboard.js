import React, { useEffect, useState } from 'react';
import { listReservations } from '../../utils/api';
import TableList from '../TableList/TableList';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const Dashboard = ({ date }) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const loadDashboard = () => {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  useEffect(loadDashboard, [date]);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex flex-column mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <TableList />
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
};

export default Dashboard;
