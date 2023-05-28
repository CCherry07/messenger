import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Conversation)
    private readonly conversation: Repository<Conversation>,
  ) {
    this.user = user;
    this.conversation = conversation;
  }
  create(createConversationDto: CreateConversationDto) {
    return this.newConversation(createConversationDto);
  }

  async newConversation(createConversationDto: CreateConversationDto) {
    const { isGroup, members, userId, name } = createConversationDto;
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
      const users = await this.user.find({
        where: {
          id: In([...members, userId]),
        },
        relations: ['conversations'],
      });
      const conversation = new Conversation({
        name,
        isGroup,
        users: [...users],
      });

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
      users: [
        await this.user.findOne({
          where: {
            id: userId,
          },
        }),
      ],
    });

    return {
      code: 0,
      data: await this.conversation.save(newConversation),
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
