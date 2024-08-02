import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Otp } from 'src/entities/otp.entity';
import { SignUpRepository } from './sign-up.repository';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Otp]), MailerModule],
  controllers: [SignUpController],
  providers: [SignUpService, SignUpRepository]
})
export class SignUpModule {}
