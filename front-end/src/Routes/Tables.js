import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../ErrorHandlers/NotFound';
import NewTableCtr from '../Containers/NewTable/NewTableCtr';
import EditTableCtr from '../Containers/EditTable/EditTableCtr';

const Tables = () => (
  <div>
    <Switch>
      <Route path={'/tables/new'}>
        <NewTableCtr />
      </Route>
      <Route path={'/tables/:table_id/edit'}>
        <EditTableCtr />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default Tables;
