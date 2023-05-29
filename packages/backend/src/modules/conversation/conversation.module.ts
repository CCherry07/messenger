import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from '../message/entities/message.entity';
import { Conversations_Users } from '../entities/conversations_users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation, Message, Conversations_Users]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
