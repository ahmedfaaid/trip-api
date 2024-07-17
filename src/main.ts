import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import connectRedis from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import Redis from 'ioredis';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const client = new Redis();
  const RedisStore = new connectRedis({
    client
  });
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tripfare API')
    .setDescription('The API server for the Tripfare travel application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads'
  });
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  app.use(
    session({
      store: RedisStore,
      name: 'tripfare-qid',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
      }
    })
  );
  app.useBodyParser('json', { limit: '10mb' });
  app.useBodyParser('urlencoded', { limit: '10mb', extended: true });
  await app.listen(5100);
}
bootstrap();
