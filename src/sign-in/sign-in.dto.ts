import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}