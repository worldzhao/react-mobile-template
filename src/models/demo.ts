import { RootState, RootDispatch } from '@/store';
import { login } from '@/services';
import { LoginParams, DemoModelState } from '@/schemas';

const initialState = (null as any) as DemoModelState;

const model = {
  state: initialState,

  effects: (dispatch: RootDispatch) => ({
    async loginAsync(payload: LoginParams, rootState: RootState) {
      const res = await login(payload);
      dispatch.demo.login(res);
      return res;
    }
  }),

  reducers: {
    login(state: DemoModelState, payload: DemoModelState['userInfo']) {
      return {
        ...state,
        userInfo: payload
      };
    }
  }
};

export default model;
