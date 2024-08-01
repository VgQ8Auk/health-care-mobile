import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { GENDER } from "src/entities/users.entity";

export class SignUpDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @Length(10, 15, { message: 'Invalid Length' })
    phonenumber: string

    @IsString()
    country: string

    @IsEnum(GENDER)
    gender: GENDER

    @Type(() => Date)
    @IsDate()
    dateofbirth: Date
}

export class OtpDTO {
    @IsNumber()
    id:number

    @IsString()
    otp:string

}