import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewTableForm = () => {
  const history = useHistory();
  const initialNewTable = {
    table_name: '',
    capacity: 1,
  };
  const [newTable, setNewTable] = useState(initialNewTable);

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

export default NewTableForm;
