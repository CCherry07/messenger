export type { EntitiesTypes } from "@messenger/backend";

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  accessToken: string;
};
