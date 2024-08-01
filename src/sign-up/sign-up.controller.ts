import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpDTO, SignUpDTO } from './sign-up.dto';
import { SignUpService } from './sign-up.service';

@Controller('sign-up')
export class SignUpController {
    constructor (
        private signupService : SignUpService
    ) {}
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() INFO: SignUpDTO){
        console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - signUp")
        
        return this.signupService.createSignUpService(INFO)
    }

    @Post('verify')
    @HttpCode(HttpStatus.CREATED)
    async otpVerification(@Body() INFO:OtpDTO){
        console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - verification")
        return this.signupService.otpVerification(INFO)
    }

    @Post('resend')
    @HttpCode(HttpStatus.CREATED)
    async otpResend(@Body('id') id:number){
        console.log(new Date(new Date().getTime() - (new Date().getTimezoneOffset()) * 60 * 1000).toUTCString(), "Post - verification")
        return this.signupService.otpResend(id)
    }
    
}
