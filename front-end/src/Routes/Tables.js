import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../ErrorHandlers/NotFound';
import NewTable from '../Containers/NewTable/NewTableCtr';

const Tables = () => (
  <div>
    <Switch>
      <Route path={'/tables/new'}>
        <NewTable />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </div>
);

export default Tables;
