export { User as UserEntity } from "@messenger/backend/src/user/entities/user.entity";
export { Message as EntityEntity } from "@messenger/backend/src/message/entities/message.entity";
export { Conversation as ConversationEntity } from "@messenger/backend/src/conversation/entities/conversation.entity";

export type GetPromiseValue<T> = T extends Promise<infer U> ? U : T;

export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  accessToken: string;
};
