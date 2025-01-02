import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.model';
import { PresetMessageOption } from 'src/messages/entities/preset-options.model';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, PresetMessageOption])],
  exports: [TypeOrmModule, ChatsService],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
