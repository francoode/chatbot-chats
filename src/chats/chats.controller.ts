import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { MessagePattern } from '@nestjs/microservices';
import { ChatCreateData, CheckChatExistsData } from 'src/types/chat.types';


@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('client/:id')
  getOne(@Param('id') id: string) {
    return this.chatsService.getOneOrFail(id);
  }


  /* @MessagePattern('CHAT_USER_CHECK_EXISTS')
  async check(data: CheckChatExistsData) {
    console.log('checkkk userasdas... ');
    await this.chatsService.checkExists(data);
  } */

/*   @MessagePattern('CHAT_CREATE')
  async create(data: ChatCreateData) {} */
}
