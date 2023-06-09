import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../conversation/entities/conversation.entity';
import { pusherServer } from 'src/common/pusher';

interface userInfo {
  id: number;
  name: string;
  email: string;
}
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {
    this.messageRepository = messageRepository;
    this.conversationRepository = conversationRepository;
  }
  async create(createMessageDto: CreateMessageDto, userInfo: userInfo) {
    const { conversationId } = createMessageDto;
    // 找到对应的会话
    const conversation = await this.conversationRepository.findOne({
      where: {
        id: conversationId,
      },
      relations: ['users', 'messages'],
    });
    if (!conversation) {
      return {
        code: 400,
        message: 'No conversation found',
      };
    }
    const messageType = createMessageDto.type ?? 'text';
    const newMessage = new Message({ ...createMessageDto, type: messageType });
    newMessage.senderId = userInfo.id;
    const saveMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageAt = new Date();
    conversation.messages.push(saveMessage);

    // trigger pusher event to all users in the conversation
    await this.conversationRepository.save(conversation);
    await pusherServer.trigger(
      `conversation-${conversationId}`,
      'message:new',
      {
        message: saveMessage,
        conversationId,
      },
    );

    conversation.users.forEach((user) => {
      if (user.id !== userInfo.id) {
        pusherServer.trigger(`user-${user.id}`, 'message:new', {
          message: saveMessage,
          conversationId,
        });
      }
    });

    return {
      code: 0,
      data: saveMessage,
    };
  }

  async getMessagesByConversationId(conversationId: number) {
    const messages = await this.messageRepository.find({
      where: {
        conversationId,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['sender', 'seen'],
    });

    if (!messages) {
      return {
        code: 0,
        data: [],
        message: 'No messages found',
      };
    }

    return {
      code: 0,
      data: messages,
    };
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
