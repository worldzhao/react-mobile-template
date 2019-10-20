export interface LoginParams {
  username: string;
  password: string;
}

export type LoginResponse = {
  id: number;
  age: number;
  username: string;
} | null;

export interface DemoModelState {
  userInfo: LoginResponse;
}
