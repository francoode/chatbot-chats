import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats/entities/chat.model';
import { PresetMessage } from './messages/entities/preset-message.model';
import { Message } from './messages/entities/message.model';

@Module({
  imports: [
    ChatsModule,
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: Number(3306),
      username: 'root',
      password: 'appmodule',
      database: 'chat_bot',
      entities: [Chat, PresetMessage, Message],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
