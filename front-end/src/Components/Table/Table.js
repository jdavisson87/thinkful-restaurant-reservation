import React from 'react';
import './Table.css';

const Table = ({ table_name = 'table', size = 1, reserved = false }) => {
  let status = reserved === false ? 'Free' : 'Occupied';
  let btnColor = reserved === false ? 'btn-success' : 'btn-danger';
  let tableShape = size <= 2 ? 'double' : size <= 4 ? 'quad' : 'great';

  return (
    <div className="card tableCard m-2">
      <div className="card-header">{table_name}</div>
      <div className="d-flex justify-content-center tableShape">
        <div className={`${tableShape}`} />
      </div>
      <h5>Seats: {size}</h5>
      <button className={`btn ${btnColor}`}>{status}</button>
    </div>
  );
};

export default Table;
