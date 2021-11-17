import React, { useState, useEffect } from 'react';
import ReservationItem from '../../Components/ReservationItem/ReservationItem';
import { listReservations } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationList = ({ date }) => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

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
  console.log(reservations, date, ' reservation list');

  let content =
    reservations.length === 0 && loading === false ? (
      <div>
        <p>There are no reservations</p>
      </div>
    ) : (
      <ul>
        {reservations.map((reservation) => (
          <ReservationItem
            reservation={reservation}
            key={reservation.reservation_id}
          />
        ))}
      </ul>
    );

  return loading ? (
    <div>
      <p>loading...</p>
    </div>
  ) : (
    <div>
      {content}
      <ErrorAlert error={reservationsError} />
    </div>
  );
};

export default ReservationList;
