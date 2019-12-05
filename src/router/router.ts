import { RouteProps } from 'react-router-dom';

import Demo from '@/views/demo';

export const routerConfig: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Demo,
  },
];
