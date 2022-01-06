import React from 'react';
import ReservationItem from '../../Components/ReservationItem/ReservationItem';

import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationList = ({ reservations, error, searchType }) => {
  let content =
    reservations.length === 0 ? (
      <div>
        <p>There are no reservations for this {searchType}</p>
      </div>
    ) : (
      <ul className="card-deck m-0 p-0">
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
