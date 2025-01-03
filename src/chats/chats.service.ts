import { CHAT_CREATE_EVENT } from '@chatbot/shared-lib';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client, ClientProxy } from '@chatbot/shared-lib';
import { InjectRepository } from '@nestjs/typeorm';
import { chatServiceClient, userServiceClient } from '@chatbot/shared-lib';
import { CreateChatDto } from 'src/types/chat.types';
import { DataSource, Repository } from 'typeorm';
import { Chat } from './entities/chat.model';

@Injectable()
export class ChatsService {
  @Inject() dataSource: DataSource;
  @InjectRepository(Chat) private chatRepository: Repository<Chat>;
  @Client(chatServiceClient) chatClient: ClientProxy;

  getByIdOrFail = async (id: number) => {
    return await this.chatRepository.findOneOrFail({ where: { id } });
  };

  getByInternalId = async (internalId: string) => {
    return await this.chatRepository.findOneOrFail({ where: { internalId } });
  };

  create = async (body: CreateChatDto) => {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const chat = await queryRunner.manager.save(Chat, body);
      //@todo manage error
      this.chatClient.emit(CHAT_CREATE_EVENT, chat);
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
