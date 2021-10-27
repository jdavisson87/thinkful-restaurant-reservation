import React from 'react';
import Table from '../../Components/Table/Table';

const TableList = () => {
  return (
    <div>
      <h1>Table List</h1>
      <div className="d-flex flex-wrap justify-content-md-start justify-content-between">
        <Table table_name="table 1" size={4} reserved={true} />
        <Table table_name="table 2" size={2} reserved={false} />
        <Table table_name="table 3" size={6} reserved={true} />
      </div>
    </div>
  );
};

export default TableList;
