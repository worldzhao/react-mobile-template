/**
 *  [修复rematch类型问题](https://zhuanlan.zhihu.com/p/78741920)
 *  请勿使用 @rematch/core 中导出的类型定义
 */

interface ModelReducers<S = any> {
  [key: string]: (state: S, payload: any) => S;
}

interface ModelEffects<RootState = any> {
  [key: string]: (payload?: any, rootState?: RootState) => Promise<any>;
}

export interface ModelConfig<S = any, RS = any> {
  state: S;
  reducers: ModelReducers<S>;
  effects: (dispatch: any) => ModelEffects<RS>;
}

export interface Models<M = any> {
  [key: string]: ModelConfig<M>;
}

export type RematchRootState<M extends Models> = {
  [modelKey in keyof M]: M[modelKey]['state'];
};

export type ReducerFromModel<R extends ModelReducers> = {
  [reducerKey in keyof R]: Reducer2connect<R[reducerKey]>;
};

export type EffectFromModel<E extends ModelEffects> = {
  [effectKey in keyof E]: Effect2connect<E[effectKey]>;
};

type Reducer2connect<R extends Function> = R extends (state: infer S, ...payload: infer P) => any
  ? (...payload: P) => S
  : () => void;

type Effect2connect<E extends Function> = E extends () => infer S
  ? () => Promise<S>
  : E extends (payload: infer P, ...args: any[]) => infer S
  ? (payload: P) => Promise<S>
  : () => Promise<any>;

// type ReducerFromModel<R extends Function> = R extends (state: infer S, payload: infer P) => infer S ? S : 'no';
export type RematchRootDispatch<M extends Models> = {
  [modelKey in keyof M]: ReducerFromModel<M[modelKey]['reducers']> &
    EffectFromModel<ReturnType<M[modelKey]['effects']>>;
};

/* @rematch/loading */
type ExtractRematchLoadingFromEffects<effects extends ModelConfig['effects']> = effects extends ((
  ...args: any[]
) => infer R)
  ? R extends ModelEffects<any>
    ? ExtractRematchLoadingFromEffectsObject<R>
    : {}
  : effects extends ModelEffects<any>
  ? ExtractRematchLoadingFromEffectsObject<effects>
  : {};

type ExtractRematchLoadingFromEffectsObject<effects extends ModelEffects<any>> = {
  [effectKey in keyof effects]: boolean;
};

export interface LoadingState<M extends Models> {
  loading: {
    global: boolean;
    models: { [k in keyof M]: boolean };
    effects: { [k in keyof M]: ExtractRematchLoadingFromEffects<M[k]['effects']> };
  };
}

declare module '@rematch/core' {
  export function init<M extends Models>(config: any): any;
}
