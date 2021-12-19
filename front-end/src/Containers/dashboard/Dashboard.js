import React, { useState, useEffect } from 'react';
import DatePicker from '../../Components/DatePicker/DatePicker';
import TableList from '../TableList/TableList';
import useQuery from '../../utils/useQuery';
import { listReservations } from '../../utils/api';
import ReservationList from '../ReservationList/ReservationList';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const Dashboard = ({ date }) => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const dateUrl = useQuery().get('date');
  if (dateUrl) {
    date = dateUrl;
  }

  const loadReservations = () => {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then((data) => {
        setReservations(data);
        setLoading(false);
      })
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  useEffect(loadReservations, [date]);

  const whileLoading = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <main>
      <div className="d-md-flex flex-column mb-3">
        <DatePicker date={date} />
        <h3 className="mb-0">Reservations for date</h3>
        {loading ? (
          whileLoading
        ) : (
          <ReservationList
            reservations={reservations}
            error={reservationsError}
            searchType="date"
          />
        )}
        <h3 className="mb-0">Table List</h3>
        <TableList />
      </div>
    </main>
  );
};

export default Dashboard;
