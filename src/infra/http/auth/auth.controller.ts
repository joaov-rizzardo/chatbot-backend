import { Body, Controller, HttpCode, Post, UnauthorizedException } from "@nestjs/common";
import { UserLoginDTO } from "src/application/dtos/auth/user-login-dto";
import { UserLoginUseCase } from "src/application/use-cases/auth/user-login-use-case";
import { BadCredentialsError } from "src/domain/errors/auth/bad-credentials-error";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly userLoginUseCase: UserLoginUseCase,
    ) { }

    @HttpCode(200)
    @Post("login")
    async login(@Body() { email, password }: UserLoginDTO) {
        try {
            const result = await this.userLoginUseCase.execute({ email, password })
            return result
        } catch (error) {
            if (error instanceof BadCredentialsError) {
                throw new UnauthorizedException({
                    code: error.code,
                    message: error.message
                })
            }
            throw error
        }
    }
}