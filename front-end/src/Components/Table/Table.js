import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import './Table.css';

const Table = ({ table_name = 'table', size = 1, tableId }) => {
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
    <li className="card tableCard m-2" key={tableId}>
      <div className="card-header d-flex justify-content-between align-content-center">
        <h5 className="m-0">{table_name}</h5>
        <div>
          <Link to={`/tables/${tableId}/edit`}>
            <FontAwesomeIcon icon={faCogs} />
          </Link>
        </div>
      </div>
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
    </li>
  );
};

export default Table;
