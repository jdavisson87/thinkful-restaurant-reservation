import React from 'react';

const ReservationButtons = ({ onCancel, id }) => (
  <div className="btn-toolbar-vertical" role="toolbar">
    <div className="btn-group">
      <a className="btn btn-success m-1" href={`/reservations/${id}/edit`}>
        <span className="oi oi-pencil mr-2 p-1">&nbsp;Edit</span>
      </a>
      <a className="btn btn-info m-1" href={`/reservations/${id}/seat`}>
        <span className="oi oi-check mr-2 p-1">&nbsp;Seat</span>
      </a>
    </div>
    <div className="btn-group">
      <button
        className="btn btn-danger m-1"
        onClick={onCancel}
        data-reservation-id-cancel={id}
      >
        <span className="oi oi-ban mr-2 p-1">&nbsp; Cancel</span>
      </button>
    </div>
  </div>
);

export default ReservationButtons;
