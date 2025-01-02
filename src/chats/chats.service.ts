import { CHAT_CREATE_EVENT } from '@chatbot/shared-lib';
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { chatServiceClient, userServiceClient } from 'src/shared/helper';
import { CreateChatDto } from 'src/types/chat.types';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.model';

@Injectable()
export class ChatsService {
  @InjectRepository(Chat) private chatRepository: Repository<Chat>;
  @Client(userServiceClient) userClient: ClientProxy;
  @Client(chatServiceClient) chatClient: ClientProxy;

  getByIdOrFail = async (id: number) => {
    const chat = await this.chatRepository.findOne({
      where: { id },
      relations: [
        'messages',
        'messages.presetMessage',
        'messages.presetMessage.options',
        'messages.presetMessage.options.optionMessage',
      ],
    });
    return chat;
  };

  getByInternalId = async (internalId: string) => {
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.messages', 'messages')
      .leftJoinAndSelect('messages.presetMessage', 'presetMessage')
      .leftJoinAndSelect('presetMessage.options', 'options')
      .where('chat.internalId = :id', { id: internalId })
      .getOne();

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
