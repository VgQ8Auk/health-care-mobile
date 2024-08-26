import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/.entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfoDTO } from './user-info.dto';
import { UserInfoRepository } from './user-info.repository';

@Injectable()
export class UserInfoService {
    constructor(
        private userinfoRepository : UserInfoRepository
    ) {}

    async modifyUserInfo(body:UserInfoDTO, userID:number): Promise<Users> {
        this.userinfoRepository.saveModifiedUserInfoRepository(body, userID)
        return
    }
}
