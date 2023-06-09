import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { GetInfoByToken } from 'src/get-info-by-token/get-info-by-token.decorator';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {
    this.conversationService = conversationService;
  }

  @Post()
  create(
    @GetInfoByToken() info,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationService.create(createConversationDto, info);
  }

  @Post('user')
  getConversationByUserId(@Body('userId') userId: string) {
    return this.conversationService.getConversationsByUserId(+userId);
  }

  @Post(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Post(':id/seen')
  updateSeen(@Param('id') id: string, @GetInfoByToken() info: any) {
    return this.conversationService.updateSeen(+id, info);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.removeById(+id);
  }
}
