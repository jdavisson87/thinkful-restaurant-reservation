import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { today, formatAsTime } from '../utils/date-time';

const ReservationForm = () => {
  const initialForm = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: today(),
    reservation_time: formatAsTime(new Date().toTimeString()),
    people: 1,
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialForm });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange = ({ target }) => {
    let value = target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group col-md-4">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="First Name"
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
          <label htmlFor="mobile">Mobile Number:</label>
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
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;