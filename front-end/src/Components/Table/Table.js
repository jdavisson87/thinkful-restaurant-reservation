import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import './Table.css';

const Table = ({ table }) => {
  const { table_name, capacity, open, table_id, reservation_id } = table;

  let status = reservation_id ? 'Occupied' : 'Free';
  let tableShape = capacity <= 2 ? 'double' : capacity <= 4 ? 'quad' : 'great';

  let finishBtn = reservation_id ? (
    <div>
      <p>{reservation_id}</p>
      <button className="btn btn-info">Finish</button>
    </div>
  ) : null;

  return (
    <li className="card tableCard m-2" key={table_id}>
      <div className="card-header d-flex justify-content-between align-content-center">
        <h5 className="m-0">{table_name}</h5>
        <div>
          <Link to={`/tables/${table_id}/edit`}>
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
      <h5>Seats: {capacity}</h5>
      <p>{finishBtn}</p>
    </li>
  );
};

export default Table;
