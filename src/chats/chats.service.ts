import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckChatExistsData } from 'src/types/chat.types';
import { Chat } from './entities/chat.model';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  @InjectRepository(Chat) private usersRepository: Repository<Chat>;

  checkExists = async (data: CheckChatExistsData): Promise<boolean> => {
    const { userId } = data;
    console.log(userId);
    return !!(await this.usersRepository.findOne({ where: { userId } }));
  };
}
