import React from 'react';
import styles from './index.module.scss';

function Hello(props) {
  const { title } = props;
  return (
    <div>
      <h2 className={styles['dora-hello']}>hello {title}</h2>
    </div>
  );
}

export default Hello;
