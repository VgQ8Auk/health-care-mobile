import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/.entities/users.entity";
import { Repository } from "typeorm";
import { UserInfoDTO } from "./user-info.dto";


export class UserInfoRepository {
    constructor(
        @InjectRepository(Users)
        private repositoryUsers: Repository<Users>
    ) { }

    async saveModifiedUserInfoRepository(body:UserInfoDTO, userID:number): Promise<Users | null> {
        try {
            const user = await this.repositoryUsers.findOne({where:{id:userID}});
            if (!user) {
                console.log('User not found');
                return null;
            }
            Object.assign(user, body)
            delete user.email
            return this.repositoryUsers.save(user)
        } catch (error) {
            console.log('saveModifiedUserInfoRepository', error);
            throw new Error();
        }
    }

}