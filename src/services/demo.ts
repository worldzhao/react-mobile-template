import { request } from '@/utils';
import { GetUserParams, GetUserResponse, PostUserParams, PostUserResponse } from '@/typings';

// get测试
export const getUser = (params: GetUserParams) => {
  return request<GetUserResponse>({ url: '/api/user', params });
};

// post测试
export const postUser = (data: PostUserParams) => {
  return request<PostUserResponse>({
    url: '/api/login/account',
    method: 'post',
    data
  });
};
