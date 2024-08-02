import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDTO } from './sign-in.dto';

@Controller('sign-in')
export class SignInController {
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    async SignIn(@Body() INFO: SignInDTO){
        console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - SignIn")

    }
}
