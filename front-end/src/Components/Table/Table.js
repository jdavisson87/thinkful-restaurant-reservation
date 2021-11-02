import React, { useState } from 'react';
import './Table.css';

const Table = ({ table_name = 'table', size = 1 }) => {
  const [occupied, setOccupied] = useState(false);

  let status = occupied === false ? 'Free' : 'Occupied';
  let btnColor = occupied === false ? 'btn-success' : 'btn-danger';
  let tableShape = size <= 2 ? 'double' : size <= 4 ? 'quad' : 'great';

  const handleSeat = () => {
    if (occupied) {
      if (
        window.confirm('Is this table currently ready?  This cannot be undone.')
      ) {
        setOccupied(!occupied);
      }
    } else {
      setOccupied(!occupied);
    }
  };

  return (
    <div className="card tableCard m-2">
      <div className="card-header">{table_name}</div>
      <div className="d-flex justify-content-center tableShape">
        <div className={`${tableShape}`} />
      </div>
      <span>
        Status:{' '}
        <span
          className={
            status === 'Free'
              ? 'text-success font-weight-bold text-uppercase'
              : 'text-danger font-weight-bold text-uppercase'
          }
        >
          {status}
        </span>
      </span>
      <h5>Seats: {size}</h5>
      <button className={`btn ${btnColor}`} onClick={handleSeat}>
        {occupied ? 'Finished' : 'Seat'}
      </button>
    </div>
  );
};

export default Table;
