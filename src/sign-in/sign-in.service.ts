import { ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from './sign-in.dto';
import { AuthService } from 'src/common/auth.service';
import * as argon from 'argon2';
import { SignInRepository } from './sign-in.repository';

@Injectable()
export class SignInService {
    constructor (
        private readonly SigninRepository: SignInRepository,
        public authJWT: AuthService
    ) {}

    async confirmSignIn(INFO: SignInDTO) {
        const userEmail = await this.SigninRepository.findUserEmail(INFO.email);
        if (!userEmail) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        if (!argon.verify(userEmail.password, INFO.password)) {
            throw new UnauthorizedException('Invalid Credentials')
        }

        if (!userEmail.authenticated) {
            throw new ForbiddenException('Unauthenticated User')
        }
        
        const {access_token} = await this.authJWT.signToken(userEmail.id, userEmail.email)

        return {
            status: HttpStatus.OK,
            message: 'Successfully signed in',
            access_token,
          }
    }
}
