import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AddMessage } from 'src/types/chat.types';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async add(@Body() body: AddMessage) {
    await this.messagesService.addMessageToChat(body);
  }
}
