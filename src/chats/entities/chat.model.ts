
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatBot, MessageBot } from '@chatbot/shared-lib';

@Entity({ name: 'chats' })
export class Chat implements ChatBot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  internalId: string;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  messages: MessageBot[];
}
