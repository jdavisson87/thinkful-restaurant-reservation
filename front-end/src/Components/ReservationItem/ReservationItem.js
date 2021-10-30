import React from 'react';

const ReservationItem = ({
  first = 'jeff',
  last = 'dav',
  mobile = '123-456-7890',
  size = '1',
  reservationTime = '3:00PM',
}) => {
  return (
    <div className="card">
      <div className="card-header">
        {first} {last}
      </div>
      <div className="card-body p-2 container">
        <div className="row">
          <span className="col-6">Mobile: {mobile}</span>
          <span className="col-6 text-center"> Size: {size}</span>
        </div>
        <div className="row">
          <span className="col-6">Reservation Time: {reservationTime}</span>
          <div className="d-flex col-6 justify-content-center">
            <button className="btn btn-success m-1">Edit</button>
            <button className="btn btn-primary m-1">Seat</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationItem;
