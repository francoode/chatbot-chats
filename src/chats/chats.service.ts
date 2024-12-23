import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckChatExistsData, CreateChatDto } from 'src/types/chat.types';
import { Chat } from './entities/chat.model';
import { Repository } from 'typeorm';
import { Client, ClientProxy } from '@nestjs/microservices';
import { userServiceClient } from 'src/shared/helper';
import { CHAT_QUEUE } from '@chatbot/shared-lib';

@Injectable()
export class ChatsService {
  @InjectRepository(Chat) private chatRepositroy: Repository<Chat>;
  @Client(userServiceClient) userClient: ClientProxy;

  getByIdOrFail = async (id: number) => {
    return await this.chatRepositroy.findOneByOrFail({ id });
  }
  getByClientOrFail = async (userId: number) => {
    const entity = await this.chatRepositroy.findOneBy({ userId });
    if (!entity) throw new NotFoundException('Invalid userId');
    return entity;
  };

  create = (body: CreateChatDto) => {
    const { userId } = body;
    return this.chatRepositroy.create({ userId });
  };
}
