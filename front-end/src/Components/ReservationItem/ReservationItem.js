import React from 'react';

const ReservationItem = ({ reservation }) => {
  console.log(reservation);
  const { first_name, last_name, mobile_number, people, reservation_time } =
    reservation;
  return (
    <div className="card m-1">
      <div className="card-header">
        {first_name} {last_name}
      </div>
      <div className="card-body p-2 container">
        <div className="row">
          <span className="col-6">Mobile: {mobile_number}</span>
          <span className="col-6 text-center"> Size: {people}</span>
        </div>
        <div className="row">
          <span className="col-6">Reservation Time: {reservation_time}</span>
          <div className="d-flex col-6 justify-content-center">
            <button className="btn btn-success m-1">Edit</button>
            <button className="btn btn-info m-1">Seat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;
