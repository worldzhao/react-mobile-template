import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';

import Router from '@/router';

import { store } from './store';

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default hot(App);
