import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { GetInfoByToken } from 'src/get-info-by-token/get-info-by-token.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(
    @GetInfoByToken() userInfo,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    console.log('userInfo', userInfo);
    return this.messageService.create(createMessageDto, userInfo);
  }

  @Post('conversationId')
  getMessagesByConversationId(@Body() conversationId: string) {
    return this.messageService.getMessagesByConversationId(conversationId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
