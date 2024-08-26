import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Otp } from "src/.entities/otp.entity";
import { Users } from "src/.entities/users.entity";
import { Repository } from "typeorm";
import { SignUpDTO } from "./sign-up.dto";

@Injectable()
export class SignUpRepository {
    constructor(
        @InjectRepository(Users)
        private repositoryUsers: Repository<Users>,
        @InjectRepository(Otp)
        private repositoryOtp: Repository<Otp>
    ) { }

    async findOneSignUpRepository(INFO: SignUpDTO): Promise<Users | null> {
        try {
            return this.repositoryUsers.findOne({ where: { email: INFO.email } })
        } catch (error) {
            console.log('findOneSignUpRepository - Cannot find the email', error);
            throw new Error();
        }
    }

    async findOneResendSignUpRepository(id: number): Promise<Users | null> {
        try {
            return this.repositoryUsers.findOne({ where: { id } })
        } catch (error) {
            console.log('findOneResendSignUpRepository - Cannot find the id', error);
            throw new Error();
        }
    }
    async saveUser(INFO: SignUpDTO) {
        try {
            const newUser = this.repositoryUsers.create(INFO);
            return this.repositoryUsers.save(newUser)
        }
        catch (error) {
            console.log('saveUser - Cannot save the User', error);
            throw new Error();
        }
    }

    async createOTP(user: Users, otpValue: string, expiryTime: Date): Promise<Otp | null> {
        try {
            const otp = this.repositoryOtp.create({
                otp: otpValue,
                expiredAt: expiryTime,
                user: user
            });
            const savedOTP = await this.repositoryOtp.save(otp);
            return savedOTP;
        } catch (error) {
            console.log('createOTP - Cannot create OTP: ', error);
            throw new Error();
        }
    }

    async verifyOTP(userID: number): Promise<Otp> {
        try {
            const latestOtp = await this.repositoryOtp.createQueryBuilder('otp')
                .innerJoinAndSelect('otp.user', 'user')
                .where('otp.user.id = :userID', { userID })
                .orderBy('otp.expiredAt', 'DESC')
                .getOne();
            return latestOtp;
        } catch (error) {
            console.error('verifyOTP - Cannot verify OTP: ', error);
            throw new Error();
        }
    }

    async setValid(id: number) {
        try {
            const findOTP = await this.repositoryUsers.findOne({ where: { id } })
            if (!findOTP) {
                throw new NotFoundException("Cannot find user's OTP")
            }
            findOTP.authenticated = true
            console.log('findOTP.authenticated = true', findOTP)
            await this.repositoryUsers.save(findOTP)
            return findOTP
        } catch (error) {
            console.log('setValid - Cannot set Valid: ', error);
            throw new Error
        }
    }
}