import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { PresetMessageOption } from './preset-options.model';

export enum PresetMessageTree {
  ROOT = 'ROOT', //raiz
  TERMINAL = 'TERMINAL', //nodo terminal
  LEAVES = 'LEAVES', //hojas
}

@Entity()
export class PresetMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false,  type: 'enum', enum: PresetMessageTree, default: PresetMessageTree.LEAVES })
  type: PresetMessageTree;

  @OneToOne(() => PresetMessage, (mensaje) => mensaje.id)
  previousMessageId: number;

  @OneToMany(() => PresetMessageOption, (option) => option.parentMessage, {
    cascade: true,
  })
  options: PresetMessageOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* @BeforeInsert()
  @BeforeUpdate()
  validarCampos() {
    if (this.type === PresetMessageTree.ROOT && !this.previousMessageId)
      throw new Error(
        'A message cannot be created as root if it has a previous message set',
      );

    if (this.previousMessageId && this.type === PresetMessageTree.ROOT)
      throw new Error(
        'A message with a previous message set cannot be marked as root.',
      );
  } */
}
