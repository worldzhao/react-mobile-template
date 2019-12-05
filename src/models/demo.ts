/* eslint-disable  @typescript-eslint/no-unused-vars */
import { RootState, RootDispatch } from '@/store';
import { DemoService } from '@/services';
import { DemoSchema } from '@/schemas';

export interface ModelState {
  userInfo: DemoSchema.LoginAPI['Response'] | null;
}

const initialState: ModelState = { userInfo: null };

export default {
  state: initialState,

  effects: (dispatch: RootDispatch) => ({
    async loginAsync(payload: DemoSchema.LoginAPI['Params'], rootState: RootState) {
      const res = await DemoService.login(payload);
      dispatch.demo.setUserInfo(res);
      return res;
    },
  }),

  reducers: {
    setUserInfo(state: ModelState, payload: ModelState['userInfo']) {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};
