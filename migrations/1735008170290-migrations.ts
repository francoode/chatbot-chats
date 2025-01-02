import {
  PresetMessage,
  PresetMessageTree,
} from 'src/messages/entities/preset-message.model';
import { PresetMessageOption } from 'src/messages/entities/preset-options.model';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1735008170290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const presetRepository = queryRunner.manager.getRepository(PresetMessage);
    const optionRepository =
      queryRunner.manager.getRepository(PresetMessageOption);

    const rootMessage = presetRepository.create({
      text: 'Welcome to Chatbot',
      type: PresetMessageTree.ROOT,
    });

    const option1 = presetRepository.create({
      text: 'Text Option1',
      type: PresetMessageTree.LEAVES,
    });

    const option2 = presetRepository.create({
      text: 'Text Option2',
      type: PresetMessageTree.LEAVES,
    });

    await presetRepository.save(rootMessage);
    await presetRepository.save(option1);
    await presetRepository.save(option2);

    /* const optOne = optionRepository.create({
      title: 'Option 1',
      parentMessage: rootMessage,
      option: option1,
    });

    const optTwo = optionRepository.create({
      title: 'Option 2',
      parentMessage: rootMessage,
      option: option2
    }); */

/*     await optionRepository.save(optOne);
    await optionRepository.save(optTwo); */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}


//npx typeorm migration:run -d ./dist/src/typeorm.config.js
