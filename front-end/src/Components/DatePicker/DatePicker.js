import React from 'react';
import Clock from '../Clock/Clock';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/format-date';
import { today, previous, next } from '../../utils/date-time';

const DatePicker = ({ date }) => {
  return (
    <div className="d-flex flex-column text-center m-4">
      <div>
        <h2>{formatDate(date)}</h2>
        <Clock />
      </div>
      <div>
        <Link
          className="btn btn-info m-2"
          to={`/dashboard?date=${previous(date)}`}
        >
          Previous
        </Link>
        <Link className="btn btn-dark m-2" to={`/dashboard?date=${today()}`}>
          Today
        </Link>
        <Link className="btn btn-info m-2" to={`/dashboard?date=${next(date)}`}>
          Next
        </Link>
      </div>
    </div>
  );
};

export default DatePicker;
