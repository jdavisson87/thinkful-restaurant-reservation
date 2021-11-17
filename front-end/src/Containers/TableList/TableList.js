import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table/Table';
import { listTables } from '../../utils/api';
import ErrorAlert from '../../ErrorHandlers/ErrorAlert';

const TableList = () => {
  // create a loading state

  const loadTables = () => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
  };
  useEffect(() => {
    loadTables();
  }, []);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  return tables.length === 0 ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <ul className="d-flex flex-wrap justify-content-md-between justify-content-around p-0">
      {tables.map((table) => (
        <Table
          table_name={table.table_name}
          size={table.capacity}
          reserved={table.open}
          tableId={table.table_id}
          key={`${table.table_id}${table.table_name}`}
        />
      ))}
      <ErrorAlert error={tablesError} />
    </ul>
  );
};

export default TableList;
