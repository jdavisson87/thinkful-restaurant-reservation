import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { today, formatAsTime, formatAsDate } from '../utils/date-time';
import {
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
} from '../utils/api';
import ErrorAlert from '../ErrorHandlers/ErrorAlert';

const ReservationForm = () => {
  const { reservationId } = useParams();
  const history = useHistory();

  const initialForm = useMemo(() => {
    return {
      first_name: '',
      last_name: '',
      mobile_number: '',
      reservation_date: today(),
      reservation_time: formatAsTime(new Date().toTimeString()),
      people: 1,
    };
  }, []);

  const [formData, setFormData] = useState({ ...initialForm });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (reservationId) {
      const abortController = new AbortController();
      setFormError(null);
      getReservation(reservationId, abortController.signal)
        .then(setFormData)
        .catch(setFormError);
      return () => abortController.abort();
    } else {
      setFormData({ ...initialForm });
    }
  }, [reservationId, initialForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData, ' reservation form');
    const abortController = new AbortController();
    setFormError(null);
    // if new reservation, call createReservation. if edit, need updateReservation
    if (!reservationId) {
      createReservation(formData, abortController.signal)
        .then(() => history.push(`/dashboard?date${formData.reservation_date}`))
        .catch(setFormError);
    } else {
      const editReservation = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        people: formData.people,
        mobile_number: formData.mobile_number,
        reservation_date: formatAsDate(formData.reservation_date),
        reservation_time: formatAsTime(formData.reservation_time),
        status: 'booked',
        reservation_id: reservationId,
      };
      updateReservation(reservationId, editReservation, abortController.signal)
        .then(() =>
          history.push(`/dashboard?date=${formData.reservation_date}`)
        )
        .catch(setFormError);
    }

    return () => abortController.abort();
  };

  const handleChange = ({ target }) => {
    let value = target.value;
    if (target.name === 'people' && typeof value === 'string') {
      value = +value;
    }
    setFormData({ ...formData, [target.name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteReservation(reservationId)
      .then(() => {
        console.log('deleted');
      })
      .then(() => {
        history.push('/dashboard');
      })
      .catch(setFormError);
  };

  const deleteBtn = (
    <button type="button" className="btn btn-danger m-3" onClick={handleDelete}>
      Delete
    </button>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-4">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            id="first_name"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.last_name}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="mobile">
            Mobile Number (Please format your number with dashes):
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            onChange={handleChange}
            placeholder="XXX - XXX - XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.mobile_number}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="reservation_date">Reservation Date:</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            value={formData.reservation_date}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="reservation_time">Reservation Time:</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            onChange={handleChange}
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="partySize">Party Size:</label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            min="1"
            value={formData.people}
            required={true}
          />
        </div>
        <div className="btn-toolbar col-md-6">
          <button
            type="button"
            className="btn btn-secondary m-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
          {reservationId && deleteBtn}
        </div>
        <ErrorAlert error={formError} />
      </form>
    </div>
  );
};

export default ReservationForm;
