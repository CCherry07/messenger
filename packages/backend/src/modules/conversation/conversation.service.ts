import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { ServiceResponse } from 'src/exports';
import { Message } from '../message/entities/message.entity';
import { Conversations_Users } from '../entities/conversations_users.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversations_Users)
    private readonly cu: Repository<Conversations_Users>,
    @InjectRepository(Conversation)
    private readonly conversation: Repository<Conversation>,
    @InjectRepository(Message) private readonly message: Repository<Message>,
  ) {
    this.conversation = conversation;
    this.message = message;
    this.cu = cu;
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
        userIds: members,
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
      userIds: [userId],
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
        // messages: {
        //   seender: true,
        //   seen: true,
        // },
      },
      order: {
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

  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
