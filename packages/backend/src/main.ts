import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { __DEV__ } from 'content';
console.log(`Running in ${__DEV__ ? 'development' : 'production'} mode`);
console.log(`Listening on port ${process.env.BACKEND_PORT || 3000}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.BACKEND_PORT || 3000);
}
bootstrap();
