import React from 'react';

const SearchForm = () => {
  return (
    <div className="d-flex justify-content-center justify-content-md-start">
      <form className="form-group text-center text-md-left">
        <label htmlFor="mobile_number">Search by Mobile Number</label>

        <div className="input-group mb-3">
          <input
            type="phone"
            name="mobile_number"
            id="mobile_number"
            placeholder="XXX - XXX - XXXX"
            required={true}
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
