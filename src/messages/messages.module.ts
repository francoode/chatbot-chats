import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatsModule } from 'src/chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.model';
import { PresetMessage } from './entities/preset-message.model';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [TypeOrmModule.forFeature([Message, PresetMessage]), ChatsModule],
  exports: [TypeOrmModule]
})
export class MessagesModule {}
