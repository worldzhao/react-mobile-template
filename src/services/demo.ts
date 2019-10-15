import { request } from '@/utils';
import { LoginParams, LoginResponse } from '@/schemas';

export const login = (data: LoginParams) => {
  return request<LoginResponse>({
    url: '/login/account',
    method: 'post',
    data
  });
};
