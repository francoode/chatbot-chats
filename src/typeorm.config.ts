import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const bdConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'appmodule',
  database: 'chat_bot',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
