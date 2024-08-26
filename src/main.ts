import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.use(session({
      name: 'NESTJS_SESSION_ID',
      secret: 'Grzegorz Brzęczyszczykiewicz. Chrząszczyżewoszyce, powiat Łękołody',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000,
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(cors());
  await app.listen(3001);
}
bootstrap();
