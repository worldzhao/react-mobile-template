import React from 'react';
import styles from './index.module.scss';

const BasicLayout = props => {
  const { children } = props;
  return <div className={styles['basic-layout']}>{children}</div>;
};

export default BasicLayout;
