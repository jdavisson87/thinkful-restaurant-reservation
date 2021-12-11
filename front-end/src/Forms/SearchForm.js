import React, { useState } from 'react';
import { listReservationsByNumber } from '../utils/api';

const SearchForm = ({ setSearch, setReservations, setErrors }) => {
  const [mobile, setMobile] = useState('');

  const getReservations = () => {
    const abortController = new AbortController();
    setErrors(null);
    setReservations([]);
    listReservationsByNumber(mobile, abortController.signal)
      .then((data) => setReservations(data))
      .then(console.log(mobile))
      .catch(setErrors);

    setSearch(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getReservations();
    console.log('Search Form Submit');
  };

  const handleChange = ({ target }) => {
    setMobile(target.value);
  };

  return (
    <div className="d-flex justify-content-center justify-content-md-start">
      <form
        className="form-group text-center text-md-left"
        onSubmit={handleSubmit}
      >
        <label htmlFor="mobile_number">
          <h5 className="mx-0 my-1">Search by Mobile Number</h5>
        </label>
        <p className="mx-0 my-1">Please format your number with dashes</p>

        <div className="input-group mb-3">
          <input
            type="tel"
            name="mobile_number"
            id="mobile_number"
            placeholder="XXX - XXX - XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required={true}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Find
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
