import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

    async signToken(userID: number, email: string): Promise<{ access_token: string }> {
    const payload = { "id": userID, email };
    const secret = this.configService.get<string>('JWT_SECRET')
    if (!secret) throw new Error('JWT secret is not defined in the configuration')
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
        access_token: token
    }
  }
}
