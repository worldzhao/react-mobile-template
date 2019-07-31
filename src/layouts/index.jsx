import React, { Component } from 'react';
import BasicLayout from './basicLayout';

class Layout extends Component {
  render() {
    const { children } = this.props;
    // 可以根据 pathname 自定义选择layout组件
    // console.log(window.location.pathname);

    return <BasicLayout>{children}</BasicLayout>;
  }
}

export default Layout;
