import { ConfigType, registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: 'mysql' as const,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  port: Number.parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));

export type DatabaseConfig = ConfigType<typeof databaseConfig>;
