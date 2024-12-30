import { Injectable, NotFoundException, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckChatExistsData, CreateChatDto } from 'src/types/chat.types';
import { Chat } from './entities/chat.model';
import { Repository } from 'typeorm';
import { Client, ClientProxy } from '@nestjs/microservices';
import { chatServiceClient, userServiceClient } from 'src/shared/helper';
import { CHAT_CREATE_EVENT, CHAT_QUEUE } from '@chatbot/shared-lib';
import { Subject } from 'rxjs';

@Injectable()
export class ChatsService implements OnModuleInit {
  @InjectRepository(Chat) private chatRepository: Repository<Chat>;
  @Client(userServiceClient) userClient: ClientProxy;
  @Client(chatServiceClient) chatClient: ClientProxy;

  private dataSubject = new Subject<any>();

  onModuleInit() {
    // Simular la emisión de datos dinámicos cada 2 segundos
    setInterval(() => {
      console.log('evento emitido');
      const value = {
        message: 'Nuevo valor dinámico',
        timestamp: new Date().toISOString(),
      };
      this.dataSubject.next(value);
    }, 2000);
  }

  getDataStream() {
    return this.dataSubject.asObservable();
  }

  getByIdOrFail = async (id: number) => {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: [
        'messages',
        'messages.presetMessage',
        'messages.presetMessage.options',
        'messages.presetMessage.options.option',
      ],
    });
    return chat;
  };

  getByInternalId = async (internalId: string) => {
    const chat = await this.chatRepository.findOne({
      where: { internalId },
      relations: [
        'messages',
        'messages.presetMessage',
        'messages.presetMessage.options',
        'messages.presetMessage.options.option',
      ],
    });

    this.dataSubject.next(chat);

    return chat;
  };
  getByClientOrFail = async (userId: number) => {
    const entity = await this.chatRepository.findOneBy({ userId });
    if (!entity) throw new NotFoundException('Invalid userId');
    return entity;
  };

  create = async (body: CreateChatDto) => {
    const { userId, internalId } = body;
    const chat = this.chatRepository.create({ userId, internalId });
    await this.chatRepository.save(chat);

    this.chatClient.emit(CHAT_CREATE_EVENT, chat);

    return { id: chat.id, internalId: chat.internalId };
  };
}
