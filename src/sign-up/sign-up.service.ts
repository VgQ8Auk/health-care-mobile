import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OtpDTO, SignUpDTO } from './sign-up.dto';
import { SignUpRepository } from './sign-up.repository';
import * as argon from 'argon2';
import { Users } from 'src/entities/users.entity';
@Injectable()
export class SignUpService {
    constructor(
        private signupRepository: SignUpRepository
    ) { }
    async createSignUpService(INFO: SignUpDTO): Promise<Users> {
        try {
            const INFOhash = await argon.hash(INFO.password);
            INFO.password = INFOhash;
            const existingUser = await this.signupRepository.findOneSignUpRepository(INFO);
            if (existingUser) {
                throw new ConflictException('Email already exists');
            }
            const newUser = await this.signupRepository.saveUser(INFO);
            const otpValue = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            const expiryTime = new Date();
            expiryTime.setTime(expiryTime.getTime() + 300000);
            await this.signupRepository.createOTP(newUser, otpValue, expiryTime);
            return newUser;
        }
        catch (error) {
            throw error;
        }
    }

    async otpVerification (INFO:OtpDTO) {
        try {
            const otpEntry = await this.signupRepository.verifyOTP(INFO.id)
            if (!otpEntry) {
                console.log("User's ID not found")
                throw new NotFoundException()
            }
    
            if (otpEntry.otp !== INFO.otp) {
                throw new BadRequestException("OTP does not match")
            }
    
            if (otpEntry.expiredAt < new Date()) {
                throw new BadRequestException('OTP expired')
            }
            await this.signupRepository.setValid(INFO.id)
            return otpEntry
        }
        catch (error) {
            throw error
        }
    }

    async otpResend (id:number) {
        const existingUser = await this.signupRepository.findOneResendSignUpRepository(id);
        console.log(existingUser)
        const otpValue = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const expiryTime = new Date();
        expiryTime.setTime(expiryTime.getTime() + 300000);
        await this.signupRepository.createOTP(existingUser, otpValue, expiryTime);
    }
}
