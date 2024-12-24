import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AddMessage } from 'src/types/chat.types';
import { CHAT_CREATE_EVENT } from '@chatbot/shared-lib';
import { MessagePattern } from '@nestjs/microservices';
import { Chat } from 'src/chats/entities/chat.model';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async add(@Body() body: AddMessage) {
    await this.messagesService.addMessageToChat(body);
  }

  @MessagePattern(CHAT_CREATE_EVENT)
  async chatCreate(data: Chat) {
    await this.messagesService.createRootMessage(data);
  }

}
