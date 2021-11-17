import React, { useState, useEffect } from 'react';
import ReservationItem from '../../Components/ReservationItem/ReservationItem';
import { listReservations } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationList = ({ date }) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const loadReservations = () => {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  };

  useEffect(loadReservations, [date]);
  console.log(reservations, date, ' reservation list');

  let content =
    reservations.length === 0 ? (
      <div>
        <p>There are no reservations</p>
      </div>
    ) : (
      <ul>
        {reservations.map((reservation) => (
          <ReservationItem reservation={reservation} />
        ))}
      </ul>
    );

  return (
    <div>
      {content}
      <ErrorAlert error={reservationsError} />
    </div>
  );
};

export default ReservationList;
