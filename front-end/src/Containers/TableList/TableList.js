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
    console.log(tables);
  }, []);

  const [tables, setTables] = useState([
    { table_name: 'table1', capacity: 5, open: true },
  ]);

  return tables.length === 0 ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div className="d-flex flex-wrap justify-content-md-start justify-content-between">
      {tables.map((table) => (
        <Table
          table_name={table.table_name}
          size={table.capacity}
          reserved={table.open}
        />
      ))}
      <Table table_name="table 1" size={4} reserved={true} />
      <Table table_name="table 2" size={2} reserved={false} />
      <Table table_name="table 3" size={6} reserved={true} />
    </div>
  );
};

export default TableList;
