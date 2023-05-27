export type GetPromiseValue<T> = T extends Promise<infer U> ? U : T;

export type User = {
  name: string;
  email: string;
  image: string;
  accessToken: string;
};
