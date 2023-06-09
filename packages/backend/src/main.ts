import { resolve } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { __DEV__ } from 'content';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import FormatResponse from './common/FormatResponse';
import FormatError from './common/FormatError';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

console.log(`Running in ${__DEV__ ? 'development' : 'production'} mode`);
console.log(`Listening on port ${process.env.BACKEND_PORT || 3000}`);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new FormatResponse());
  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalFilters(new FormatError());
  app.enableCors();
  app.useStaticAssets(resolve(process.cwd(), './upload'), {
    prefix: '/assets',
  });
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
