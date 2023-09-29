import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: '123456',
  // database: 'my_db',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
