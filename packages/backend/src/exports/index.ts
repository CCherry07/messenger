import type { User } from '../modules/user/entities/user.entity';
import type { Message } from '../modules/message/entities/message.entity';
import type { Conversation } from '../modules/conversation/entities/conversation.entity';

export interface EntitiesTypes {
  UserEntity: User;
  MessageEntity: Message;
  ConversationEntity: Conversation;
}

export interface ServiceResponse<T> {
  code: number;
  data?: T;
  message?: string;
  success?: boolean;
}
