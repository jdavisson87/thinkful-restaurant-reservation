import React, { useState, useEffect } from 'react';
import Table from '../../Components/Table/Table';
import { listTables } from '../../utils/api';

const TableList = () => {
  const loadTables = () => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
  };
  useEffect(() => {
    loadTables();
  }, []);

  const [tables, setTables] = useState([
    { table_name: 'table1', capacity: 5, open: true },
  ]);

  return tables.length === 0 ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div className="d-flex flex-wrap justify-content-md-between justify-content-around">
      {tables.map((table) => (
        <Table
          table_name={table.table_name}
          size={table.capacity}
          reserved={table.open}
        />
      ))}
    </div>
  );
};

export default TableList;
