import { getUser, login } from '@/services';

export default {
  state: {
    user: {},
    postUser: {},
    config: {}
  },
  effects: dispatch => ({
    async getUserAsync(payload, rootState) {
      console.log(rootState);

      const res = await getUser(payload);
      dispatch.demo.getUser(res);
    },
    async loginAsync(payload) {
      const res = await login(payload);
      dispatch.demo.login(res);
    }
  }),
  reducers: {
    getUser(state, payload) {
      return {
        ...state,
        user: payload
      };
    },
    login(state, payload) {
      return {
        ...state,
        postUser: payload
      };
    }
  }
};
