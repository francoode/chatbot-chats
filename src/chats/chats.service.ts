import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckChatExistsData } from 'src/types/chat.types';
import { Chat } from './entities/chat.model';
import { Repository } from 'typeorm';
import { Client, ClientProxy } from '@nestjs/microservices';
import { userServiceClient } from 'src/shared/helper';

@Injectable()
export class ChatsService {
  @InjectRepository(Chat) private usersRepository: Repository<Chat>;
  @Client(userServiceClient) userClient: ClientProxy;

  checkExists = async (data: CheckChatExistsData): Promise<void> => {
    const { userId } = data;
    const exists = !!(await this.usersRepository.findOne({
      where: { userId },
    }));

    this.userClient.emit('chat_user_exists', {exists});
  };
}
