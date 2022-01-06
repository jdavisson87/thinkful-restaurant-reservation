import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateStatus } from '../../utils/api';
import { printableTime } from '../../utils/date-time';
import ReservationButtons from '../ReservationButtons/ReservationButtons';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const ReservationItem = ({ reservation }) => {
  const {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_time,
    reservation_id,
    status,
  } = reservation;

  const history = useHistory();
  const [cancelError, setCancelError] = useState(null);

  const handleCancel = () => {
    if (window.confirm('Do you wish to cancel this reservation')) {
      const abortController = new AbortController();
      setCancelError(null);

      updateStatus(reservation_id, 'cancelled', abortController.signal)
        .then(() => history.go(0))
        .catch(setCancelError);
      return () => abortController.abort();
    }
  };

  let resStatus = null;

  resStatus =
    status === 'cancelled' ? (
      <span className="text-danger">CANCELLED</span>
    ) : status === 'booked' ? (
      <span className="text-success">BOOKED</span>
    ) : status === 'finished' ? (
      <span className="text-success">FINISHED</span>
    ) : status === 'seated' ? (
      <span className="text-success">SEATED</span>
    ) : null;

  let buttons = null;
  if (status === 'booked') {
    buttons = (
      <ReservationButtons onCancel={handleCancel} id={reservation_id} />
    );
  }

  return (
    <li
      className="card m-1 "
      key={reservation_id}
      style={{ 'min-width': '250px' }}
    >
      <div className="card-header d-flex flex-column">
        <h4 className="font-weight-bold">
          {first_name} {last_name}
        </h4>

        <h5 className="font-weight-bold">
          <span className="oi oi-phone" />
          &nbsp; {mobile_number}
        </h5>
      </div>
      <div className="card-body container-fluid text-center">
        <div className="row">
          <p className="m-0 p-0">Reservation Time:</p>
          <p className="font-weight-bold m-0 p-0">
            &nbsp; {printableTime(reservation_time)}
          </p>
        </div>
        <div className="row">
          <p className="p-0 m-0"> Size: </p>
          <p className="font-weight-bold m-0 p-0">&nbsp; {people}</p>
        </div>
        <div className="row">
          <p className="p-0 m-0"> Status: {resStatus}</p>
        </div>
        <div className="row">{buttons}</div>
        <ErrorAlert error={cancelError} />
      </div>
    </li>
  );
};

export default ReservationItem;

//
//
//         <p>Status: {resStatus}</p>
//         <span>{buttons}</span>
