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
  //  @Client(userServiceClient) userClient: ClientProxy;

  getOneOrFail = async (id: string) => {
    const entity = await this.chatRepositroy.findOneBy({ userId: Number(id) });
    if(!entity) throw new NotFoundException('Invalid userId');
    return entity;
  };

  create = (body: CreateChatDto) => {
    return this.chatRepositroy.create({userId: Number(body.userId)})
  }

  /* checkExists = async (data: CheckChatExistsData): Promise<void> => {
    const { userId } = data;
    const exists = !!(await this.usersRepository.findOne({
      where: { userId },
    }));

    this.userClient.emit(CHAT_QUEUE, {});
  }; */
}
