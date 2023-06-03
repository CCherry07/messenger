import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { ServiceResponse } from 'src/exports';
import { Message } from '../message/entities/message.entity';
import { Conversations_Users } from '../entities/conversations_users.entity';
import { Messages_Seen } from '../entities/messages_seen';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversations_Users)
    private readonly cu: Repository<Conversations_Users>,
    @InjectRepository(Conversation)
    private readonly conversation: Repository<Conversation>,
    @InjectRepository(Message) private readonly message: Repository<Message>,
    @InjectRepository(Messages_Seen)
    private readonly Messages_Seen: Repository<Messages_Seen>,
  ) {
    this.conversation = conversation;
    this.message = message;
    this.cu = cu;
    this.Messages_Seen = Messages_Seen;
  }
  async create(
    createConversationDto: CreateConversationDto,
  ): Promise<ServiceResponse<Conversation>> {
    return await this.newConversation(createConversationDto);
  }

  async newConversation(createConversationDto: CreateConversationDto) {
    const { isGroup, members, userId, name, currentUserId } =
      createConversationDto;
    if (isGroup && members.length < 2) {
      return {
        code: 400,
        message: 'group chats need at least two people',
      };
    }
    if (isGroup && !name) {
      return {
        code: 400,
        message: 'group chats need a name',
      };
    }
    if (isGroup) {
      const conversation = new Conversation({
        name,
        isGroup,
        userIds: [...members, currentUserId],
      });
      const res = await this.conversation.save(conversation);
      const newCU = members.map((member) => {
        return new Conversations_Users({
          userId: member,
          conversationId: res.id,
        });
      });
      await this.cu.save(newCU);
      return {
        code: 0,
        data: await this.conversation.save(conversation),
      };
    }
    const existstingConversations = await this.conversation.find({
      where: {
        isGroup: false,
        userIds: In([userId]),
      },
    });

    const singleConversation = existstingConversations[0];
    if (singleConversation) {
      return {
        code: 0,
        data: singleConversation,
      };
    }

    const newConversation = new Conversation({
      isGroup: false,
      userIds: [userId, currentUserId],
    });
    const res = await this.conversation.save(newConversation);
    const newCU = new Conversations_Users({
      userId,
      conversationId: res.id,
    });
    await this.cu.save(newCU);
    return {
      code: 0,
      data: res,
    };
  }

  async getConversationsByUserId(userId: number) {
    if (!userId) {
      return {
        code: 400,
        message: 'userId is required',
      };
    }
    const conversations = await this.conversation.find({
      where: {
        userIds: Like(`%${userId}%`) as any,
      },
      order: {
        messages: {
          createdAt: 'ASC',
        },
        lastMessageAt: 'DESC',
      },
      relations: ['messages', 'users'],
    });

    if (conversations.length > 0) {
      return {
        code: 0,
        data: conversations,
      };
    }
    return {
      code: 0,
      data: [],
      message: 'no conversations',
    };
  }

  async findOne(id: number) {
    const conversation = await this.conversation.findOne({
      where: {
        id,
      },
      relations: ['users'],
    });

    if (!conversation) {
      return {
        code: 404,
        message: 'conversation not found',
      };
    }
    return {
      code: 0,
      data: conversation,
    };
  }

  async updateSeen(id: number) {
    const conversation = await this.conversation.findOne({
      where: {
        id,
      },
      relations: ['users', 'messages'],
    });
    if (!conversation) {
      return {
        code: 404,
        message: 'conversation not found',
      };
    }
    const lastMessage = conversation.messages.at(-1);
    if (!lastMessage) {
      return {
        code: 404,
        data: conversation,
      };
    }
    const seen = (conversation.users || []).map((user) => {
      return new Messages_Seen({
        messageId: lastMessage.id,
        userId: user.id,
      });
    });
    await this.Messages_Seen.save(seen);
    return {
      code: 0,
      data: conversation,
    };
  }
  async removeById(id: number) {
    // 删除 conversation 时，同时删除 messages 和 conversation_users
    const conversation = await this.conversation.findOne({
      where: {
        id,
      },
      relations: ['messages'],
    });
    if (!conversation) {
      return {
        code: 404,
        message: 'conversation not found',
      };
    }
    const currentConversationUsers = await this.cu.find({
      where: {
        conversationId: id,
      },
    });
    await this.cu.remove(currentConversationUsers);

    const messageIds = conversation.messages.map((message) => message.id);
    await this.message.delete(messageIds);
    await this.conversation.remove(conversation);
    return {
      code: 0,
      message: 'conversation deleted',
    };
  }
}
