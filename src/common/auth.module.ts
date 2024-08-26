import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/.entities/users.entity';

@Module({
    imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
