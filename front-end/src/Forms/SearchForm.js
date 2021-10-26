import React from 'react';

const SearchForm = () => {
  return (
    <div>
      <form>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="phone"
          name="mobile_number"
          id="mobile_number"
          placeholder="Enter mobile number"
          required={true}
        />
        <div className="btn-toolbar col-md-6">
          <button type="submit" className="btn btn-primary m-3">
            Find
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
