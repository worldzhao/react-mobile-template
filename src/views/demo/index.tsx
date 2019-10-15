import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, RootDispatch } from '@/store';
import { _ } from '@/utils';
import cx from 'classnames';
import styles from './index.module.scss';

const mapState = ({ demo, loading }: RootState) => ({
  demoState: demo,
  demoPageLoading: loading.models.demo, // models/demo 中只有要异步请求正在进行 该值便为true 作用域为model
  loginSubmitLoading: loading.effects.demo.loginAsync // loginAsync的loading状态
});

const mapDispatch = ({ demo }: RootDispatch) => ({ demo });

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

interface State {
  username: string;
  password: string;
}

class LoginDemo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  get isSubmitBtnClickable() {
    const { username, password } = this.state;
    return username.length && password.length;
  }

  handleInputChange = (key: keyof State, val: string) => {
    // 动态设置react state
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
    this.setState(({
      [key]: val
    } as any) as Pick<State, keyof State>);
  };

  login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { demo } = this.props;
    try {
      // 业务正常逻辑
      const userInfo = await demo.loginAsync({ username, password });
      if (userInfo) {
        alert(`hello, ${userInfo.username}`);
      }
    } catch (error) {
      if (error && _.isNumber(error.code) && error.code !== 0) {
        // 存在业务异常，此处应针对业务异常进行处理（如果有业务异常处理分支逻辑的话，譬如用户名或密码错误进行弹窗）
        alert(error.msg || '发生错误，请确认数据填写无误');
      }
      // 存在非业务异常（网络错误或服务器报错），request.ts中进行统一处理，业务代码中一般无需处理
      // else {
      // }
    }
  };

  render() {
    const { demoPageLoading, loginSubmitLoading } = this.props;
    console.log('Model（页面）级别 Loading', demoPageLoading);
    console.log('Effect（请求）级别 Loading', loginSubmitLoading);

    const submitBtnCls = cx(styles['submit-btn'], {
      [styles['submit-btn__disabled']]: !this.isSubmitBtnClickable,
      [styles['submit-btn__loading']]: loginSubmitLoading
    });

    return (
      <div className={styles['login-page']}>
        <form onSubmit={this.login}>
          <label htmlFor="username" className={styles['label']}>
            账号：
            <input
              className={styles['input']}
              type="text"
              id="username"
              placeholder="admin"
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
          </label>
          <br />
          <label htmlFor="password" className={styles['label']}>
            密码：
            <input
              className={styles['input']}
              type="password"
              id="password"
              placeholder="888888"
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
          </label>
          <br />
          <button type="submit" className={submitBtnCls} disabled={!this.isSubmitBtnClickable}>
            {loginSubmitLoading ? 'loading' : '提交'}
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapState as any,
  mapDispatch as any
)(LoginDemo);
