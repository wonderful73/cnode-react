import React from 'react';
import { Button } from 'antd-mobile';
import classnames from 'classnames';
import styles from './App.module.css';
import useAdaper from './hooks/adapter';

function App() {
  useAdaper(750);
  return (
    <div className="App">
      <div className={classnames( styles.red, styles.big)}>
        Index page.
      </div>
      <Button type="primary">primary</Button>
    </div>
  );
}

export default App;
