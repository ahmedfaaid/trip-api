import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import sqliteStoreFactory from 'express-session-sqlite';
import * as sqlite3 from 'sqlite3';
import { AppModule } from './app.module';

const SqliteStore = sqliteStoreFactory(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new SqliteStore({
        driver: sqlite3.Database,
        path: 'db.sqlite',
        ttl: 5 * 24 * 60 * 60 * 1000 // 5 days
      }),
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
  await app.listen(5100);
}
bootstrap();
