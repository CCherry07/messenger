import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { __DEV__ } from 'content';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
console.log(`Running in ${__DEV__ ? 'development' : 'production'} mode`);
console.log(`Listening on port ${process.env.BACKEND_PORT || 3000}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // docs
  const options = new DocumentBuilder()
    .setTitle('标题')
    .setDescription('描述')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(process.env.BACKEND_PORT || 3000);
}
bootstrap();
