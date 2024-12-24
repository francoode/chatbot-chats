import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

//@Todo config general
export const dataSource: DataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'appmodule',
  database: 'chat_bot',
  entities: ['dist/**/*.model{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],  
  synchronize: true,
});
console.log('object');


