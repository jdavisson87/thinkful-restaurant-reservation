import React from 'react';
import { useHistory } from 'react-router-dom';
import { formatAsTime } from '../../utils/date-time';

const ReservationItem = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
    reservation_id,
  } = reservation;
  const history = useHistory();

  return (
    <li className="card m-1">
      <h5 className="card-header font-weight-bold">
        {first_name} {last_name}
      </h5>
      <div className="card-body p-2 container">
        <div className="row">
          <span className="col-6">Mobile: {mobile_number}</span>
          <span className="col-6 text-center"> Size: {people}</span>
        </div>
        <div className="row">
          <span className="col-6">
            Reservation Time: {formatAsTime(reservation_time)}
          </span>
          <div className="d-flex col-6 justify-content-center">
            <button
              className="btn btn-success m-1"
              onClick={() =>
                history.push(`/reservations/${reservation_id}/edit`)
              }
            >
              Edit
            </button>
            <button className="btn btn-info m-1">Seat</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReservationItem;
