import React from 'react';

import { printableTime } from '../../utils/date-time';
import ReservationButtons from '../ReservationButtons/ReservationButtons';

const ReservationItem = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
    reservation_date,
    reservation_id,
    status,
  } = reservation;

  const handleSeat = (e) => {
    e.preventDefault();
    console.log('seat', reservation_id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('cancel');
  };

  let resStatus = null;

  resStatus =
    status === 'cancelled' ? (
      <div className="row">
        <span className="col-6 text-danger">CANCELLED</span>
      </div>
    ) : status === 'finished' ? (
      <div className="row">
        <span className="col-6 text-success">FINISHED</span>
      </div>
    ) : null;

  let buttons = null;
  if (status === 'booked') {
    buttons = (
      <ReservationButtons
        onSeat={handleSeat}
        onCancel={handleCancel}
        id={reservation_id}
      />
    );
  }

  return (
    <li className="card m-1" key={reservation_id}>
      <h5 className="card-header font-weight-bold">
        <div className="row">
          <span className="col-6">
            {first_name} {last_name}
          </span>
          <span className="col-6 text-right">
            <span className="oi oi-phone" />
            &nbsp; &nbsp; {mobile_number}
          </span>
        </div>
      </h5>
      <div className="card-body m-0 p-2 container-fluid">
        <div className="row">
          <span className="col-6">Reservation Date: {reservation_date}</span>
          <span className="col-6 text-right"> Size: {people}</span>
        </div>

        <div className="row">
          <span className="col-6">
            Reservation Time: {printableTime(reservation_time)}
          </span>
          {buttons}
        </div>
        {resStatus}
      </div>
    </li>
  );
};

export default ReservationItem;
