import { Injectable } from "@nestjs/common";
import { RefreshTokenDTO } from "src/application/dtos/auth/refresh-token-dto";
import { InvalidRefreshTokenError } from "src/domain/errors/auth/invalid-refresh-token-error";
import { SessionRepository } from "src/domain/repositories/session.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { WorkspaceMemberRepository } from "src/domain/repositories/workspace-member.repository";
import { GenerateAccessTokenInput, TokenService } from "src/domain/services/auth/token-service";

@Injectable()
export class RefreshTokenUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
        private readonly tokenService: TokenService,
        private readonly workspaceMemberRepository: WorkspaceMemberRepository,
    ) { }

    public async execute({ refreshToken }: RefreshTokenDTO) {
        if (!this.tokenService.checkRefreshToken(refreshToken)) {
            throw new InvalidRefreshTokenError()
        }
        const decodedToken = this.tokenService.decodeRefreshToken(refreshToken)
        const user = await this.userRepository.findById(decodedToken.userId)
        if (!user) throw new InvalidRefreshTokenError()
        const session = await this.sessionRepository.findById(decodedToken.sessionId)
        if (!session) throw new InvalidRefreshTokenError()
        const tokenPayload: GenerateAccessTokenInput = {
            userId: user.id,
            sessionId: session.id,
            email: user.email,
            lastName: user.lastName,
            name: user.name,
        }
        if (session.workspaceId) {
            const workspaceMember = await this.workspaceMemberRepository.findMember(user.id, session.workspaceId)
            if (workspaceMember) {
                tokenPayload["workspaceId"] = workspaceMember.workspaceId
                tokenPayload["workspaceRole"] = workspaceMember.role
            }
        }
        const accessToken = this.tokenService.generateAccessToken(tokenPayload)
        return { accessToken }
    }
}