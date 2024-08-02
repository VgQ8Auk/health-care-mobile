import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OtpDTO, SignUpDTO } from './sign-up.dto';
import { SignUpRepository } from './sign-up.repository';
import * as argon from 'argon2';
import { Users } from 'src/entities/users.entity';
import { SendEmailDto } from 'src/mailer/mailer.dto';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class SignUpService {
    constructor(
        private signupRepository: SignUpRepository,
        private mailerService: MailerService
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
            const mailerDto: SendEmailDto = {
                recipients: [{
                    name: '', // Since there is no 'name' field, we'll leave this empty or use a default value
                    address: newUser.email
                }],
                subject: "[HealthCare Mobile] Verify email information to register for HealthCare Mobile account",
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                        color: #0066cc;
                    }
                    .content {
                        font-size: 16px;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #cc0000;
                        padding: 20px 0;
                    }
                    .note {
                        font-size: 14px;
                        color: #999;
                        margin-top: 20px;
                    }
                    </style>
                </head>
                <body>
                    <div class="container">
                    <div class="header">
                        <h1>Email Information Verification</h1>
                    </div>
                    <div class="content">
                        <p>You are registering to use the HealthCare Mobile application.</p>
                        <div class="otp">OTP - ${otpValue}</div>
                        <p class="note">(*) Note: OTP code is only valid for 5 minutes.</p>
                    </div>
                    </div>
                </body>
                </html>
                `,
                text: `Email information verification\n\nYou are registering to use the HealthCare Mobile application.\n\nOTP - ${otpValue}\n\n(*) Note: OTP code is only valid for 5 minutes.`,
                placeholderReplacements: {
                    otp: otpValue
                }
            };
    
            await this.mailerService.sendEmail(mailerDto);
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
            const mailerDto: SendEmailDto = {
                recipients: [{
                    name: '', // Since there is no 'name' field, we'll leave this empty or use a default value
                    address: otpEntry.user.email
                }],
                subject: "[HealthCare Mobile] Email Verification Successful",
                html: `
                <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #4CAF50;
    }
    .content {
      font-size: 16px;
    }
    .footer {
      font-size: 12px;
      color: #999;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Verification Successful</h1>
    </div>
    <div class="content">
      <p>Dear user,</p>
      <p>Your email has been successfully verified. You can now access all the features of the HealthCare Mobile application.</p>
      <p>If you did not perform this action, please contact our support team immediately.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 HealthCare Mobile. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
                `,
                text: `Dear user,\nYour email has been successfully verified. You can now access all the features of the HealthCare Mobile application.\nIf you did not perform this action, please contact our support team immediately.`,
                
            };
    
            await this.mailerService.sendEmail(mailerDto);
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
