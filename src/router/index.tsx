import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from '@/layouts';

import { routerConfig } from './router';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        {routerConfig.map(props => (
          <Route {...props} key={props.path as string} />
        ))}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
