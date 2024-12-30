import { USER_NEW_EVENT } from '@chatbot/shared-lib';
import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChatDto } from 'src/types/chat.types';
import { ChatsService } from './chats.service';


@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('users/:id')
  getByClient(@Param('id') id: number) {
    return this.chatsService.getByClientOrFail(id);
  }

  @Get()
  get(@Query('internalId') internalId: string) {
    return this.chatsService.getByInternalId(internalId);
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
