import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.model';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  exports: [TypeOrmModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
