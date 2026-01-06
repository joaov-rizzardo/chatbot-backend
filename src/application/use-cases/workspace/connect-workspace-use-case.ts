import { Injectable } from "@nestjs/common";
import { SessionDoesNotExistsError } from "src/domain/errors/workspace/session-does-not-exists-error";
import { UserNotExistsError } from "src/domain/errors/workspace/user-not-exists-error";
import { UserNotMemberWorkspaceError } from "src/domain/errors/workspace/user-not-member-workspace-error";
import { SessionRepository } from "src/domain/repositories/session.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { WorkspaceMemberRepository } from "src/domain/repositories/workspace-member.repository";
import { TokenService } from "src/domain/services/auth/token-service";

@Injectable()
export class ConnectWorkspaceUseCase {

    constructor(
        private readonly workspaceMemberRepository: WorkspaceMemberRepository,
        private readonly sessionRepository: SessionRepository,
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService
    ) { }

    public async execute(sessionId: string, workspaceId: string) {
        const session = await this.sessionRepository.findById(sessionId)
        if (!session) throw new SessionDoesNotExistsError()
        const user = await this.userRepository.findById(session.userId)
        if (!user) throw new UserNotExistsError()
        const workspaceMember = await this.workspaceMemberRepository.findMember(session.userId, workspaceId)
        if (!workspaceMember) throw new UserNotMemberWorkspaceError()
        await this.sessionRepository.connectWorkspace(sessionId, workspaceId)
        const accessToken = this.tokenService.generateAccessToken({
            userId: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            sessionId: session.id,
            workspaceId,
            workspaceRole: workspaceMember.role
        })
        return accessToken
    }
}