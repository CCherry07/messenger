import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { __DEV__ } from 'content';
import { resolve } from 'path';
import { databaseConfig } from './db/database.config';
import { DatabaseModule } from './db/database.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: __DEV__
        ? resolve(process.cwd(), '../../.dev.env')
        : resolve(process.cwd(), '../../.prod.env'),
      load: [databaseConfig],
    }),
    DatabaseModule,
    UserModule,
    MessageModule,
    ConversationModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
