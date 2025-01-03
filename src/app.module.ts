import { Module } from '@nestjs/common';

import { ChatsModule } from './chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats/entities/chat.model';

@Module({
  imports: [
    ChatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: Number(3306),
      username: 'root',
      password: 'appmodule',
      database: 'chat_bot',
      entities: [Chat],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
