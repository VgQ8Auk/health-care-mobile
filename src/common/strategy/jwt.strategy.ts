import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, 
        @InjectRepository(Users)
        private readonly userRepository:Repository<Users>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: {id:number, email:string}) {
        console.log(payload.id)
        const user = await this.userRepository.findOne({where : { id: payload.id, email:payload.email}})
        delete user.password
        console.log({ user, message : "Strategy Validated" })
        return user
    }
}