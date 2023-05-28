export type { User as UserEntity } from "@messenger/backend/src/user/entities/user.entity";
export type { Message as EntityEntity } from "@messenger/backend/src/message/entities/message.entity";
export type { Conversation as ConversationEntity } from "@messenger/backend/src/conversation/entities/conversation.entity";

export type GetPromiseValue<T> = T extends Promise<infer U> ? U : T;

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  accessToken: string;
};
