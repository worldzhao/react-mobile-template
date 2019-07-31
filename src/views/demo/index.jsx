import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Hello } from '@/components';
import styles from './index.module.scss';

@connect(store => ({
  demo: store.demo,
  loading: store.loading.models.demo, // models/demo 中只有要异步请求正在进行 该值便为true 作用域为model
  getLoading: store.loading.effects.demo.getUserAsync, // models/demo/effects/getUserAsync 进行中 该值便为true 作用域为effects
  postLoading: store.loading.effects.demo.loginAsync, // 同上 具体effect不同
  proxyLoading: store.loading.effects.demo.getConfigProxyDemoAsync // 同上 具体effect不同
}))
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.testGet();
    this.testPost();
  }

  testGet() {
    const { getUserAsync } = this.props.dispatch.demo;
    getUserAsync({ id: '1' });
  }

  testPost() {
    const { loginAsync } = this.props.dispatch.demo;
    loginAsync({ username: 'admin', password: '888888' });
  }

  handleCountClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  render() {
    const { demo, loading, getLoading, postLoading, proxyLoading } = this.props;
    const { user, postUser, config } = demo;
    console.log('本页面全局接口 model loading', loading);
    console.log('接口 1 effect loading', getLoading);
    console.log('接口 2 effect loading', postLoading);
    console.log('接口 3 effect loading', proxyLoading);

    return (
      <div className={styles.demoWrapper}>
        <div className={styles.demo}>
          <h2 className={styles.subtitle}>welcome to dora</h2>
        </div>
        <p className={styles.content}>get:{JSON.stringify(user)}</p>
        <p className={styles.content}>post:{JSON.stringify(postUser)}</p>
        <p className={styles.content}>proxy:{JSON.stringify(config)}</p>
        <Hello title="world" />
        <button className={styles.btn} onClick={this.handleCountClick}>
          add count
        </button>
        <p className={styles.count}>{this.state.count}</p>
      </div>
    );
  }
}

export default Demo;
