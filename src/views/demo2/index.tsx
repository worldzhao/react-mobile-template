import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '@/typings';
import { RouteComponentProps } from 'react-router';
import styles from './index.module.scss';

const mapState = ({ demo, loading }: RootState) => ({
  demoState: demo,
  demoModelLoading: loading.models.demo, // models/demo 中只有要异步请求正在进行 该值便为true 作用域为model
  demoEffectsLoading: loading.effects.demo // 该值为object，键名为effects键名 键值为loading状态
});

const mapDispatch = ({ demo }: Dispatch) => ({ demoDispatch: demo });

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<{}> & {};

class TSDemoWithRematch extends Component<Props, {}> {
  componentDidMount() {
    this.getUser();
    this.postUser();
  }

  async getUser() {
    const { demoDispatch } = this.props;
    demoDispatch.getUserAsync({ id: '123' });
  }

  async postUser() {
    const { demoDispatch } = this.props;
    try {
      await demoDispatch.postUserAsync({ username: 'admin', password: '888888' });
    } catch (error) {
      console.warn('code !== 0, 存在业务异常，此处进行业务异常相关提示处理');
    }
  }

  render() {
    const { demoState, demoModelLoading, demoEffectsLoading } = this.props;
    const { getUserAsync: getLoading, postUserAsync: postLoading } = demoEffectsLoading;
    const { userDataGet, userDataPost } = demoState;
    if (userDataGet) {
      console.log('user age:', userDataGet.id);
    }
    console.log('本页面全局接口 model loading', demoModelLoading);
    console.log('接口 1 effect loading', getLoading);
    console.log('接口 2 effect loading', postLoading);

    return (
      <div className={styles.demoWrapper}>
        <div className={styles.demo}>
          <h2 className={styles.subtitle}>welcome to Iris</h2>
        </div>
        <p className={styles.content}>get:{JSON.stringify(userDataGet)}</p>
        <p className={styles.content}>post:{JSON.stringify(userDataPost)}</p>
      </div>
    );
  }
}

export default connect(
  mapState as any,
  mapDispatch as any
)(TSDemoWithRematch);
