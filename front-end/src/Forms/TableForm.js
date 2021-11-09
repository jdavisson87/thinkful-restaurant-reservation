import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { getTable, postTable } from '../utils/api';
import ErrorAlert from '../ErrorHandlers/ErrorAlert';

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

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(table_id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const abortController = new AbortController();
    setTableError(null);
    postTable(newTable, abortController.signal)
      .then(() => history.push('/dashboard'))
      .catch(setTableError);
    return () => abortController.abort();
  };

  const disableBtn = table_id < 2 ? true : false;

  const updateSubmitButtons = table_id ? (
    <div>
      <button type="submit" className="btn btn-primary m-3">
        Update
      </button>
      <button
        className="btn btn-danger m-3"
        disabled={disableBtn}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  ) : (
    <div>
      <button type="submit" className="btn btn-primary m-3">
        Submit
      </button>
    </div>
  );

  return (
    <div className="d-md-flex justify-content-around justify-content-md-start">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Table Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              value={newTable.table_name}
              onChange={handleChange}
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
          {updateSubmitButtons}
        </div>
        {disableBtn && (
          <div>
            <p>You are unable to delete this table</p>
          </div>
        )}
      </form>
      <ErrorAlert error={tableError} />
    </div>
  );
};

export default TableForm;
