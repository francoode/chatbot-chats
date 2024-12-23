import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { AddMessage } from 'src/types/chat.types';
import { Message } from './entities/message.model';
import { Repository } from 'typeorm';
import { PresetMessage } from './entities/preset-message.model';

@Injectable()
export class MessagesService {
  @Inject() chatService: ChatsService;
  @InjectRepository(PresetMessage)
  private presetRepository: Repository<PresetMessage>;

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


  };
}
