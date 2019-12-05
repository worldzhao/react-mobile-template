import * as DemoSchema from './demo';

export { DemoSchema };

// response wrapper
export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
