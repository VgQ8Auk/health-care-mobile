import { Type } from "class-transformer"
import { IsDate, IsEnum, IsOptional, IsString, Length } from "class-validator"
import { GENDER } from "src/.entities/users.entity"

export class UserInfoDTO {
    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    @Length(10, 15, { message: 'Invalid Length' })
    phonenumber?: string

    @IsOptional()
    @IsString()
    country?: string

    @IsOptional()
    @IsEnum(GENDER)
    gender?: GENDER

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dateofbirth?: Date
}