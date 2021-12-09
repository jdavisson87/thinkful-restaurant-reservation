import React, { useState, useEffect } from 'react';
import ReservationItem from '../../Components/ReservationItem/ReservationItem';

import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationList = ({ reservations, error }) => {
  let content =
    reservations.length === 0 ? (
      <div>
        <p>There are no reservations for this date</p>
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

  return (
    <div>
      {content}
      <ErrorAlert error={error} />
    </div>
  );
};

export default ReservationList;
