import { request } from '@/utils';
import { DemoSchema } from '@/schemas';

export const login = (data: DemoSchema.LoginAPI['Params']) =>
  request<DemoSchema.LoginAPI['Response']>({
    url: '/login/account',
    method: 'post',
    data,
  });
