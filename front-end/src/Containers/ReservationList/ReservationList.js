import React from 'react';
import ReservationItem from '../../Components/ReservationItem/ReservationItem';

const ReservationList = ({ reservations = [] }) => {
  return (
    <div>
      {reservations.length !== 0 ? (
        <div>
          <p>No reservations</p>
        </div>
      ) : (
        <div>
          <ReservationItem />
          <ReservationItem />
        </div>
      )}
    </div>
  );
};

export default ReservationList;
