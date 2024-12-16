import { Controller, Inject } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagePattern } from '@nestjs/microservices';
import { ChatCreateData, CheckChatExistsData } from 'src/types/chat.types';

@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  //@todo pasar a helper y a lib compartida

  @MessagePattern('chat_check_exists') 
  async check(data: CheckChatExistsData) {
    await this.chatsService.checkExists(data);

  }

  @MessagePattern('chat_create') 
  async create(data: ChatCreateData) {
    
  }
}
