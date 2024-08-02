import { Module } from '@nestjs/common';
import { SignInController } from './sign-in.controller';
import { SignInService } from './sign-in.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/entities/otp.entity';
import { Users } from 'src/entities/users.entity';
import { SignInRepository } from './sign-in.repository';
import { AuthModule } from 'src/common/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Otp]),
    AuthModule, // Ensure AuthModule is imported
  ],
  controllers: [SignInController],
  providers: [SignInService, SignInRepository],
})
export class SignInModule {}
