import React, { useState, useEffect } from 'react';
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
import './ReservationForm.css';

const ReservationForm = () => {
  const { reservation_id } = useParams();
  const history = useHistory();

  const initialForm = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: today(),
    reservation_time: formatAsTime(new Date().toTimeString()),
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialForm });
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (reservation_id) {
      const abortController = new AbortController();
      setFormError(null);
      getReservation(reservation_id, abortController.signal)
        .then(setFormData)
        .catch(setFormError);
      return () => abortController.abort();
    }
  }, [reservation_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError(null);
    // if new reservation, call createReservation. if edit, need updateReservation
    reservation_id ? submitEdit() : submitNew();
  };

  const submitNew = () => {
    const abortController = new AbortController();
    createReservation(formData, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setFormError);
    return () => abortController.abort();
  };

  const submitEdit = () => {
    const abortController = new AbortController();

    const editReservation = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      people: formData.people,
      mobile_number: formData.mobile_number,
      reservation_date: formatAsDate(formData.reservation_date),
      reservation_time: formatAsTime(formData.reservation_time),
      status: 'booked',
      reservation_id: reservation_id,
    };
    updateReservation(reservation_id, editReservation, abortController.signal)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setFormError);
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
    setFormError(null);
    deleteReservation(reservation_id)
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
          <label htmlFor="first_name">First Name:</label>
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
          <label htmlFor="last_name">Last Name:</label>
          <input
            id="last_name"
            type="text"
            className="form-control"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.last_name}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="mobile_number">
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
          <span className="validity" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="reservation_date">Reservation Date:</label>
          <input
            id="reservation_date"
            type="date"
            className="form-control"
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
            id="reservation_time"
            type="time"
            name="reservation_time"
            className="form-control"
            onChange={handleChange}
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            value={formData.reservation_time}
            required={true}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="people">Party Size:</label>
          <input
            id="people"
            type="number"
            name="people"
            className="form-control"
            onChange={handleChange}
            required={true}
            min="1"
            value={formData.people}
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
          {reservation_id && deleteBtn}
        </div>
        <ErrorAlert error={formError} />
      </form>
    </div>
  );
};

export default ReservationForm;
