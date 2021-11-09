import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { getTable } from '../utils/api';

const TableForm = () => {
  const { table_id } = useParams();
  const [tableError, setTableError] = useState(null);
  const history = useHistory();

  const initialNewTable = {
    table_name: '',
    capacity: 1,
  };

  const [newTable, setNewTable] = useState(initialNewTable);

  useEffect(() => {
    if (!table_id) return;
    const abortController = new AbortController();
    setTableError(null);

    getTable(table_id, abortController.signal)
      .then(setNewTable)
      .catch(setTableError);

    return () => abortController.abort();
  }, [table_id]);

  const handleChange = ({ target }) => {
    let value = target.value;
    setNewTable({ ...newTable, [target.name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div className="d-md-flex justify-content-around justify-content-md-start">
      <form>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Table Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              value={newTable.table_name}
              name="table_name"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Capacity</label>
          <div className="col-sm-9">
            <input
              type="number"
              id="capacity"
              name="capacity"
              min="1"
              value={newTable.capacity}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className="btn-toolbar form-group row">
          <button
            type="button"
            className="btn btn-secondary m-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary m-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
