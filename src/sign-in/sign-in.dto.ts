import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDTO {
    @IsNotEmpty({message: 'Email should not be empty'})
    @IsEmail({}, { message: 'Invalid email format' })
    email: string

    @IsNotEmpty({ message: 'Password should not be empty' })
    @IsString()
    password: string
}