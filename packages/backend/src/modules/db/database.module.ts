import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { DatabaseConfig } from './database.config';
import { databaseConfig } from './database.config';

const TypeOrmDataBaseModule = TypeOrmModule.forRootAsync({
  useFactory(databaseConfigService: DatabaseConfig) {
    return {
      type: databaseConfigService.type,
      host: databaseConfigService.host,
      port: databaseConfigService.port,
      username: databaseConfigService.username,
      password: databaseConfigService.password,
      database: databaseConfigService.database,
      autoLoadEntities: true,
      synchronize: true,
    };
  },
  inject: [databaseConfig.KEY],
});

@Module({
  imports: [TypeOrmDataBaseModule],
  providers: [],
  exports: [TypeOrmDataBaseModule],
})
export class DatabaseModule {}
