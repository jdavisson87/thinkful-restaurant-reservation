import React from 'react';
import Clock from '../Clock/Clock';
import { formatDate } from '../../utils/format-date';

const DatePicker = ({ date }) => {
  return (
    <div className="d-flex flex-column text-center m-4">
      <div>
        <h2>{formatDate(date)}</h2>
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
