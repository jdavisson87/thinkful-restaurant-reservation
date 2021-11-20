import React from 'react';
import { useParams } from 'react-router';
import ReservationForm from '../../Forms/ReservationForm';

const ReservationCtr = () => {
  const { reservation_id } = useParams();
  const content = reservation_id ? (
    <h1 className="m-3">New Reservation</h1>
  ) : (
    <h1 className="m-3">Edit Reservation</h1>
  );
  return (
    <div>
      {content}
      <ReservationForm />
    </div>
  );
};

export default ReservationCtr;
