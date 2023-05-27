export type GetPromiseValue<T> = T extends Promise<infer U> ? U : T;

export type User = {
  name: string | null;
  email: string | null;
  image: string | null;
  accessToken?: string | null;
};
