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
  
  @Get(':id')
  async get(@Param('id') id: number): Promise<ChatSerializer> {
    const chat = await this.chatsService.getByIdOrFail(id);
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
