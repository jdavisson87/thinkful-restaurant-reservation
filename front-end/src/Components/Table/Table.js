import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { finishTable } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

import './Table.css';

const Table = ({ table }) => {
  const { table_name, capacity, table_id, reservation_id } = table;
  const [tableError, setTableError] = useState(null);
  const history = useHistory();

  let status = reservation_id ? 'Occupied' : 'Free';
  let tableShape = capacity <= 2 ? 'double' : capacity <= 4 ? 'quad' : 'great';

  const handleFinish = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        'Is this table ready to seat new guests? This cannot be undone.'
      )
    ) {
      const abortController = new AbortController();
      setTableError(null);
      finishTable(table_id, abortController.signal)
        .then(() => history.go(0))
        .catch(setTableError);
      return () => abortController.abort();
    }
  };

  let finishBtn = reservation_id ? (
    <div>
      <button onClick={handleFinish} className="btn btn-info">
        Finish
      </button>
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
      {finishBtn}
      <ErrorAlert error={tableError} />
    </li>
  );
};

export default Table;
