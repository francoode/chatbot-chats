import {
  PresetMessage,
  PresetMessageTree,
} from 'src/messages/entities/preset-message.model';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1735008170290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.manager.getRepository(PresetMessage);
    const rootMessage = repository.create({
      id: 1,
      text: 'Welcome to Chatbot',
      type: PresetMessageTree.ROOT,
    });

    await repository.save(rootMessage);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
