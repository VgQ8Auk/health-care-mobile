import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { SignInModule } from './sign-in/sign-in.module';
import { AuthModule } from './common/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'quoca',
    password: 'VqaUK2003',
    database: 'login',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    dropSchema: true
  }),
  ConfigModule.forRoot({isGlobal: true}), SignUpModule, MailerModule, SignInModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
