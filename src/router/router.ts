import { RouteProps } from 'react-router';
import Demo from '@/views/demo';

export const routerConfig: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Demo
  }
];
