import { CHAT_CREATE_EVENT, messageServiceClient } from '@chatbot/shared-lib';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client, ClientProxy } from '@chatbot/shared-lib';
import { InjectRepository } from '@nestjs/typeorm';
import { chatServiceClient, userServiceClient } from '@chatbot/shared-lib';
import { CreateChatDto } from 'src/types/chat.types';
import { DataSource, Repository } from 'typeorm';
import { Chat } from './entities/chat.model';
import { default as axios } from 'axios';
@Injectable()
export class ChatsService {
  @Inject() dataSource: DataSource;
  @InjectRepository(Chat) private chatRepository: Repository<Chat>;
  @Client(messageServiceClient) messageClient: ClientProxy;

  getByIdOrFail = async (id: number) => {
    const chat = await this.chatRepository.findOneOrFail({ where: { id } });
    const messages = await axios.get(`http://chatbot-messages:3000/messages/chats/${chat.id}`);
    chat.messages = messages.data || [];
    
    return chat;
  };

 /*  getByInternalId = async (internalId: string) => {
    return await this.chatRepository.findOneOrFail({ where: { internalId } });
  }; */

  create = async (body: CreateChatDto) => {
    const emit = this.messageClient.emit(CHAT_CREATE_EVENT, {
      id: 1,
          internalId: '1',
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: []
    });
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const chat = await queryRunner.manager.save(Chat, body);
      this.messageClient.emit(CHAT_CREATE_EVENT, chat);
      await queryRunner.commitTransaction();
      return { id: chat.id, internalId: chat.internalId };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  };
}
