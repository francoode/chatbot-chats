import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagePattern } from '@nestjs/microservices';
import { AddMessage, ChatCreateData, CheckChatExistsData, CreateChatDto } from 'src/types/chat.types';
import { USER_NEW_EVENT } from '@chatbot/shared-lib';


@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('client/:id')
  getByClient(@Param('id') id: string) {
    return this.chatsService.getByClientOrFail(id);
  }

  @Post()
  create(@Body() body: CreateChatDto) {
    return this.chatsService.create(body);
  }

  


  @MessagePattern(USER_NEW_EVENT)
  async userNewEvent(data: CreateChatDto) {
    await this.chatsService.create(data);
  }

}
