import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from '../message/entities/message.entity';
import { Conversations_Users } from '../entities/conversations_users.entity';
import { Messages_Seen } from '../entities/messages_seen';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conversation,
      Message,
      Conversations_Users,
      Messages_Seen,
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
