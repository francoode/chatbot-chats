import { Message } from 'src/messages/entities/message.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  internalId: string;

  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => Message, (message) => message.chat, {eager: true})
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
