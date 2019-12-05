import React from 'react';

import styles from './index.module.scss';

function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.rect1} />
      <div className={styles.rect2} />
      <div className={styles.rect3} />
      <div className={styles.rect4} />
      <div className={styles.rect5} />
    </div>
  );
}

export default Spinner;
