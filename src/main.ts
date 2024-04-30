import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useStaticAssets(join(__dirname , '..' , 'resource'));
  app.useGlobalPipes(new ValidationPipe({transformOptions : {enableImplicitConversion : true}}));
  await app.listen(3000);
}
bootstrap();
