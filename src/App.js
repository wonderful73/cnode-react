import React from 'react';
import { Button } from 'antd-mobile';
import classnames from 'classnames';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <div className={classnames( styles.red, styles.big)}>
        cnode
      </div>
      <Button type="primary">primary</Button>
    </div>
  );
}

export default App;
