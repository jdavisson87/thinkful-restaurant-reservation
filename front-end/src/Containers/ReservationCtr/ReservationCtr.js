import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReservationForm from '../../Forms/ReservationForm';

const ReservationCtr = () => {
  const { reservationId } = useParams();
  const [title, setTitle] = useState('New');
  console.log(reservationId, 'this one');
  useEffect(() => {
    reservationId ? setTitle('Edit') : setTitle('New');
  }, [reservationId]);

  return (
    <div>
      <h1 className="m-3">{title} Reservation</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservationCtr;
