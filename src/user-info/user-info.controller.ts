import { Controller, Get, HttpCode, HttpStatus, UseGuards, Req, Put, Body } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { jwtGuard } from 'src/common/guards';
import { GetUser } from 'src/common/decorators';
import { Users } from 'src/.entities/users.entity';
import { UserInfoDTO } from './user-info.dto';

@Controller('user-info')
@UseGuards(jwtGuard)
export class UserInfoController {
    constructor(private readonly userinfoService: UserInfoService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getUserInfo(@GetUser('') user:Users) {
        delete user.id;
        delete user.authenticated;
        return user;
    }

    @Put('')
    @HttpCode(HttpStatus.NO_CONTENT)
    async modifyUserInfo(@GetUser('') user:Users, @Body() body: UserInfoDTO) {
        //console.log(user)
        this.userinfoService.modifyUserInfo(body, user.id)
        return 
    }
}
