import React from 'react';
import { useHistory } from 'react-router-dom';

const ReservationButtons = ({ onCancel, id }) => {
  const history = useHistory();
  return (
    <div className="d-flex col-6 justify-content-end">
      <button
        className="btn btn-success m-1"
        onClick={() => history.push(`/reservations/${id}/edit`)}
      >
        <span className="oi oi-pencil mr-2 p-1">&nbsp;Edit</span>
      </button>
      <a className="btn btn-info m-1" href={`/reservations/${id}/seat`}>
        <span className="oi oi-thumb-up mr-2 p-1">&nbsp;Seat</span>
      </a>
      <button className="btn btn-danger m-1" onClick={onCancel}>
        <span className="oi oi-ban mr-2 p-1">&nbsp; Cancel</span>
      </button>
    </div>
  );
};

export default ReservationButtons;
