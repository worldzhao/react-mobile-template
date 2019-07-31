import { request, _ } from '@/utils';

// get测试
export const getUser = async params => {
  const res = request('/api/user', {
    params
  });
  // 判断请求是否成功 根据业务后端决定
  if (res && _.isUndefined(res.errorCode)) {
    return res;
  }
  return {};
};

// post测试
export const login = async data => {
  const res = request('/api/login/account', {
    method: 'post',
    data
  });
  if (res && _.isUndefined(res.errorCode)) {
    return res;
  }
  return {};
};
