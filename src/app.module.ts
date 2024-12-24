import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chats/entities/chat.model';
import { bdConfig } from './typeorm.config';

@Module({
  imports: [
    ChatsModule,
    MessagesModule,
    TypeOrmModule.forRoot(bdConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
