import { Module } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { UserInfoRepository } from './user-info.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/.entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository]
})
export class UserInfoModule {}
