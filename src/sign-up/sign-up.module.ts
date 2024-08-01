import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Otp } from 'src/entities/otp.entity';
import { SignUpRepository } from './sign-up.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Otp])],
  controllers: [SignUpController],
  providers: [SignUpService, SignUpRepository]
})
export class SignUpModule {}
