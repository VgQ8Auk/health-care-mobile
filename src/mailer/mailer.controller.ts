import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send-email')
  async sendMail(@Body() body: {
    from?: { name: string; address: string },
    recipients: { name: string; address: string }[],
    placeholderReplacements?: Record<string, string>
  }) {
    const dto: SendEmailDto = {
      from: body.from ? { name: body.from.name, address: body.from.address } : undefined,
      recipients: body.recipients.map(recipient => ({
        name: recipient.name,
        address: recipient.address
      })),
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
      <div class="otp">OTP - %otp%</div>
      <p class="note">(*) Note: OTP code is only valid for 5 minutes.</p>
    </div>
  </div>
</body>
</html>
      `,
      text: "Email information verification\n\nYou are registering to use the HealthCare Mobile application.\n\nOTP - %otp%\n\n(*) Note: OTP code is only valid for 5 minutes.",
      placeholderReplacements: body.placeholderReplacements
    };
    return await this.mailerService.sendEmail(dto);
  }
}