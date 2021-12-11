import React from 'react';
import { useHistory } from 'react-router-dom';
import { printableTime } from '../../utils/date-time';

const ReservationItem = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
    reservation_date,
    reservation_id,
  } = reservation;
  const history = useHistory();

  const handleSeat = (e) => {
    e.preventDefault();
    console.log('seat', reservation_id);
  };

  return (
    <li className="card m-1">
      <h5 className="card-header font-weight-bold">
        <div className="row">
          <span className="col-6">
            {first_name} {last_name}
          </span>
          <span className="col-6 text-right">Mobile: {mobile_number}</span>
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
          <div className="d-flex col-6 justify-content-end">
            <button
              className="btn btn-success m-1"
              onClick={() =>
                history.push(`/reservations/${reservation_id}/edit`)
              }
            >
              Edit
            </button>
            <button className="btn btn-info m-1" onClick={handleSeat}>
              Seat
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReservationItem;
