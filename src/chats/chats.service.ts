import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckChatExistsData, CreateChatDto } from 'src/types/chat.types';
import { Chat } from './entities/chat.model';
import { Repository } from 'typeorm';
import { Client, ClientProxy } from '@nestjs/microservices';
import { chatServiceClient, userServiceClient } from 'src/shared/helper';
import { CHAT_CREATE_EVENT, CHAT_QUEUE } from '@chatbot/shared-lib';

@Injectable()
export class ChatsService {
  @InjectRepository(Chat) private chatRepository: Repository<Chat>;
  @Client(userServiceClient) userClient: ClientProxy;
  @Client(chatServiceClient) chatClient: ClientProxy;

  getByIdOrFail = async (id: number) => {
    const chat = await this.chatRepository.findOne({
      where: { id},
      relations: [
        'messages', 
        'messages.presetMessage', 
        'messages.presetMessage.options',
        'messages.presetMessage.options.option'
      ],
    });
    return chat;
  }
  getByClientOrFail = async (userId: number) => {
    const entity = await this.chatRepository.findOneBy({ userId });
    if (!entity) throw new NotFoundException('Invalid userId');
    return entity;
  };

  create = async (body: CreateChatDto) => {
    const { userId } = body;
    const chat =  this.chatRepository.create({ userId });
    await this.chatRepository.save(chat);

    this.chatClient.emit(CHAT_CREATE_EVENT, chat)
  };
}
