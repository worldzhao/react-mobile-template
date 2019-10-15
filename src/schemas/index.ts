// response wrapper
export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

/* 页面相关数据类型定义 注意变量命名冲突*/

// demo页面
export * from './demo';
