import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PresetMessage } from './preset-message.model';

@Entity()
export class PresetMessageOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => PresetMessage, (message) => message.options, {
    onDelete: 'CASCADE',
    eager: true,
  })
  parentMessage: PresetMessage;

  @ManyToOne(() => PresetMessage, { onDelete: 'CASCADE' })
  option: PresetMessage;
}
