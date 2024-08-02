import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO } from './sign-in.dto';
import { SignInService } from './sign-in.service';

@Controller('sign-in')
export class SignInController {
    constructor(
        private readonly SigninService: SignInService
    ){}
    @Post()
    @HttpCode(HttpStatus.OK)
    async SignIn(@Body() INFO: SignInDTO){
        console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - SignIn")
        return await this.SigninService.confirmSignIn(INFO)
    }
}
