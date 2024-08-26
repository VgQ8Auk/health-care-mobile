import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { SignInModule } from './sign-in/sign-in.module';
import { AuthModule } from './common/auth.module';
import { UserInfoModule } from './user-info/user-info.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'quoca',
    password: 'VqaUK2003',
    database: 'login',
    entities: [__dirname + '/.entities/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    dropSchema: false
  }),
  ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}), SignUpModule, MailerModule, SignInModule, AuthModule, UserInfoModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
