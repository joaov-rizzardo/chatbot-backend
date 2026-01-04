import { Injectable } from "@nestjs/common";
import { UserLoginDTO } from "src/application/dtos/auth/user-login-dto";
import { BadCredentialsError } from "src/domain/errors/auth/bad-credentials-error";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PasswordHasher } from "src/domain/services/auth/password-hasher";
import { TokenService } from "src/domain/services/auth/token-service";

@Injectable()
export class UserLoginUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly tokenService: TokenService
    ) { }

    public async execute({ email, password }: UserLoginDTO) {
        const user = await this.userRepository.findByEmail(email)
        if (!user) throw new BadCredentialsError()
        if (! await this.passwordHasher.check(password, user.password)) {
            throw new BadCredentialsError()
        }
        const accessToken = this.tokenService.generateAccessToken(user.id, {
            name: user.name,
            lastName: user.lastName,
            email: user.email
        })
        const refreshToken = this.tokenService.generateRefreshToken(user.id)
        return {
            accessToken,
            refreshToken
        }
    }
}