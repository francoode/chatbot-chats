import { USER_NEW_EVENT } from '@chatbot/shared-lib';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChatDto } from 'src/types/chat.types';
import { ChatsService } from './chats.service';
import { interval, map, Observable } from 'rxjs';

@Controller('chats')
export class ChatsController {
  @Inject() private readonly chatsService: ChatsService;

  @Get('users/:id')
  getByClient(@Param('id') id: number) {
    return this.chatsService.getByClientOrFail(id);
  }

  @Get(':internalId')
  get(@Param('internalId') internalId: string) {
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

  @Sse()
  sendEvents(): Observable<MessageEvent> {

    return this.chatsService.getDataStream().pipe(
      map((count) => {
        const event: MessageEvent = new MessageEvent('message', {
          data: { message: `Evento #${count}`, timestamp: new Date().toISOString() },
        });
        return event;
      })
    );
    
   /*  return this.chatsService.getDataStream().pipe(
      map((data) => {
        return data as MessageEvent;
      }),
    ); */
  }
}
