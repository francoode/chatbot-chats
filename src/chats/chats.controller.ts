import { USER_NEW_EVENT } from '@chatbot/shared-lib';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChatDto } from 'src/types/chat.types';
import { ChatsService } from './chats.service';
import { ChatSerializer } from './dtos/chat.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('users/:id')
  async getByClient(@Param('id') id: number) {
    const chat = await this.chatsService.getByClientOrFail(id);
    return new ChatSerializer(chat);
  }

  
  @Get(':internalId')
  async get(@Param('internalId') internalId: string): Promise<ChatSerializer> {
    const chat = await this.chatsService.getByInternalId(internalId);
    console.log(chat);
    return new ChatSerializer(chat);
  }

  @Post()
  async create(@Body() body: CreateChatDto): Promise<ChatSerializer> {
    const chat = await this.chatsService.create(body);
    return new ChatSerializer(chat);
  }

  @MessagePattern(USER_NEW_EVENT)
  async userNewEvent(data: CreateChatDto) {
    await this.chatsService.create(data);
  }
}
