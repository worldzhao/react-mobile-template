export interface LoginAPI {
  Params: {
    username: string;
    password: string;
  };
  Response: {
    id: number;
    age: number;
    username: string;
  };
}
