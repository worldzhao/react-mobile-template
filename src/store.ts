import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import { RematchRootDispatch, RematchRootState, LoadingState } from '@/typings/rematch';
import * as models from './models';

export const store = init({
  models,
  plugins: [createLoadingPlugin({})],
});

export type RootState = RematchRootState<typeof models> & LoadingState<typeof models>;

export type RootDispatch = RematchRootDispatch<typeof models>;

export interface Store {
  name: string;
  dispatch: RootDispatch;
  getState(): RootState;
}
