import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { AddMessage } from 'src/types/chat.types';
import { Message } from './entities/message.model';
import { Repository } from 'typeorm';
import {
  PresetMessage,
  PresetMessageTree,
} from './entities/preset-message.model';
import { Chat } from 'src/chats/entities/chat.model';

@Injectable()
export class MessagesService {
  @Inject() chatService: ChatsService;

  @InjectRepository(PresetMessage)
  private presetRepository: Repository<PresetMessage>;

  @InjectRepository(Message)
  private messageRepository: Repository<Message>;

  addMessageToChat = async (body: AddMessage) => {
    const { chatId, optionSelectedId, presetMessageId } = body;
    const chat = await this.chatService.getByIdOrFail(chatId);

    //caso de root message
    //caso de mensage terminal

    const presetMessage = await this.presetRepository.findOneOrFail({
      where: { id: presetMessageId },
      relations: ['options'],
    });

    const msgResponse = presetMessage.options.find(
      (opt) => Number(opt) === Number(optionSelectedId),
    );

    if (!msgResponse) throw new NotFoundException('Invalid option');

    return this.presetRepository.findOneByOrFail({ id: msgResponse.id });
  };

  createRootMessage = async (body: Chat) => {
    const { id, userId } = body;
    const rootMessage = await this.presetRepository.findOneByOrFail({
      type: PresetMessageTree.ROOT,
    });
    if (!rootMessage) throw new NotFoundException();

    const newMessage = this.messageRepository.create({
      chat: body,
      presetMessage: rootMessage,
      userId
    });
    
    await this.messageRepository.save(newMessage);

    


    console.log(newMessage);
    return newMessage;
  };
}
