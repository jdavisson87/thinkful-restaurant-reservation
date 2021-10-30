import React from 'react';
import Clock from '../Clock/Clock';

const DatePicker = () => {
  return (
    <div className="d-flex flex-column text-center">
      <div>
        <h2>Saturday, Oct 30, 2021</h2>
        <Clock />
      </div>
      <div>
        <button className="btn btn-info m-2">Previous</button>
        <button className="btn btn-dark m-2">Today</button>
        <button className="btn btn-info m-2">Next</button>
      </div>
    </div>
  );
};

export default DatePicker;
