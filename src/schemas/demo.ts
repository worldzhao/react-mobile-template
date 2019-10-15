export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  age: number;
  username: string;
}

export interface DemoModelState {
  userInfo: LoginResponse | null;
}
