import { Module } from "@nestjs/common";
import { UserLoginUseCase } from "src/application/use-cases/auth/user-login-use-case";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaUserRepository } from "../database/prisma/repositories/prisma-user.repository";
import { PasswordHasher } from "src/domain/services/auth/password-hasher";
import { BcryptPasswordHasher } from "../security/bcrypt-password-hasher";
import { TokenService } from "src/domain/services/auth/token-service";
import { JwtTokenService } from "../security/jwt-token-service";
import { AuthController } from "../http/auth/auth.controller";
import { RefreshTokenUseCase } from "src/application/use-cases/auth/refresh-token-use-case";
import { SessionRepository } from "src/domain/repositories/session.repository";
import { PrismaSessionRepository } from "../database/prisma/repositories/prisma-session.repository";
import { WorkspaceMemberRepository } from "src/domain/repositories/workspace-member.repository";
import { PrismaWorkspaceMemberRepository } from "../database/prisma/repositories/prisma-workspace-member.repository";

@Module({
    providers: [
        UserLoginUseCase,
        RefreshTokenUseCase,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        {
            provide: PasswordHasher,
            useClass: BcryptPasswordHasher
        },
        {
            provide: TokenService,
            useClass: JwtTokenService
        },
        {
            provide: SessionRepository,
            useClass: PrismaSessionRepository
        },
        {
            provide: WorkspaceMemberRepository,
            useClass: PrismaWorkspaceMemberRepository
        }
    ],
    controllers: [
        AuthController
    ],
})
export class AuthModule { }