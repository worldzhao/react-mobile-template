import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import BasicLayout from './basic_layout';

const Layout: React.FC<RouteComponentProps> = props => {
  const { children } = props;
  // 可以根据 pathname 自定义选择layout组件
  // console.log(props.location.pathname);
  return <BasicLayout>{children}</BasicLayout>;
};

export default withRouter(Layout);
