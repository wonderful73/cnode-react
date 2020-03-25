import React from 'react';
import classnames from 'classnames';
import styles from './App.module.css';
import useAdaper from './hooks/adapter';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import store from './store';
import { AppFrame } from './layout';

import { Provider, useSelector } from 'react-redux';
import Home from './views/Home';

const App = () => {
  useAdaper(750);
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppFrame>
        <React.Suspense>
          <Switch>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </React.Suspense>
        </AppFrame>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
