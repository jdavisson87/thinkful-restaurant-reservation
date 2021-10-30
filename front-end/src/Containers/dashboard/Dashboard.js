import React, { useEffect, useState } from 'react';
import { listReservations } from '../../utils/api';
import DatePicker from '../../Components/DatePicker/DatePicker';
import TableList from '../TableList/TableList';
import ReservationList from '../ReservationList/ReservationList';
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
        <DatePicker />
        <h4 className="mb-0">Reservations for date</h4>
        <ReservationList />
        <TableList />
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
};

export default Dashboard;
