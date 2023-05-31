import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
interface userInfo {
  id: string;
  name: string;
  email: string;
}
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
    this.messageRepository = messageRepository;
  }
  create(createMessageDto: CreateMessageDto, userInfo: userInfo) {
    const newMessage = this.messageRepository.create({
      ...createMessageDto,
    });
    console.log('newMessage', newMessage);
  }

  async getMessagesByConversationId(conversationId: string) {
    const messages = await this.messageRepository.find({
      where: {
        conversationId,
      },
      order: {
        createdAt: 'DESC',
      },
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
