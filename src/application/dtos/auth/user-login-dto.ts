import {
    IsEmail,
    IsString,
    MinLength,
} from 'class-validator'

export class UserLoginDTO {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string
}
