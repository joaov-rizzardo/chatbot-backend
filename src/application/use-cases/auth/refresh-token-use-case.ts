import { Injectable } from "@nestjs/common";
import { RefreshTokenDTO } from "src/application/dtos/auth/refresh-token-dto";
import { InvalidRefreshTokenError } from "src/domain/errors/auth/invalid-refresh-token-error";
import { UserRepository } from "src/domain/repositories/user.repository";
import { TokenService } from "src/domain/services/auth/token-service";

@Injectable()
export class RefreshTokenUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService
    ) { }

    public async execute({ refreshToken }: RefreshTokenDTO) {
        if (!this.tokenService.checkRefreshToken(refreshToken)) {
            throw new InvalidRefreshTokenError()
        }
        const decodedToken = this.tokenService.decodeRefreshToken(refreshToken)
        const user = await this.userRepository.findById(decodedToken.userId)
        if (!user) throw new InvalidRefreshTokenError()
        const accessToken = this.tokenService.generateAccessToken(user.id, {
            email: user.email,
            lastName: user.lastName,
            name: user.name
        })
        return { accessToken }
    }
}