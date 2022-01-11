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
  console.log(table);
  let status = reservation_id ? 'occupied' : 'free';
  let tableShape = capacity <= 2 ? 'double' : capacity <= 4 ? 'quad' : 'great';

  const handleFinish = () => {
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

  let editBtn = reservation_id ? null : (
    <div>
      <Link to={`/tables/${table_id}/edit`} disable={true}>
        <FontAwesomeIcon icon={faCogs} />
      </Link>
    </div>
  );

  let finishBtn = null;
  if (reservation_id) {
    finishBtn = (
      <button
        onClick={handleFinish}
        data-table-id-finish={table_id}
        className="btn btn-info mb-2"
      >
        <span>Finish</span>
      </button>
    );
  }

  return (
    <li className="card tableCard m-2" key={table_id}>
      <div className="card-header d-flex justify-content-between align-content-center">
        <h5 className="m-0">{table_name}</h5>
        {editBtn}
      </div>
      <div className="d-flex justify-content-center tableShape">
        <div className={`${tableShape}`} />
      </div>
      <span>
        Status:&nbsp;
        <span
          className={
            status === 'free'
              ? 'text-success font-weight-bold text-uppercase'
              : 'text-danger font-weight-bold text-uppercase'
          }
          data-table-id-status={table.table_id}
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
