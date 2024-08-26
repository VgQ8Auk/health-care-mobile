import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/.entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class SignInRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) { }

    async findUserEmail(email: string): Promise<Users> {
        try {
            return await this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne()
        } catch (error) {
            throw error
        }
    }
}