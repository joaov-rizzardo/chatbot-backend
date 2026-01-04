import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AccessTokenClaims, TokenService } from "src/domain/services/auth/token-service";
import * as jwt from "jsonwebtoken"

@Injectable()
export class JwtTokenService implements TokenService, OnModuleInit {

    private accessTokenSecret: string = ""

    private accessTokenExpirationTime: number = 300

    private refreshTokenSecret: string = ""

    private refreshTokenExpirationTime: number = 86400

    constructor(
        private readonly configService: ConfigService
    ) { }

    onModuleInit() {
        this.accessTokenSecret = this.configService.get<string>("ACCESS_TOKEN_SECRET") as string
        this.refreshTokenSecret = this.configService.get<string>("REFRESH_TOKEN_SECRET") as string
        this.accessTokenExpirationTime = this.configService.get<number>("ACCESS_TOKEN_EXPIRATION_TIME_MS") as number
        this.refreshTokenExpirationTime = this.configService.get<number>("REFRESH_TOKEN_EXPIRATION_TIME_MS") as number
    }

    generateAccessToken(userId: string, claims: AccessTokenClaims): string {
        return jwt.sign(claims, this.accessTokenSecret, {
            subject: userId,
            expiresIn: this.accessTokenExpirationTime
        })
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign({}, this.refreshTokenSecret, {
            subject: userId,
            expiresIn: this.refreshTokenExpirationTime
        })
    }

    checkAccessToken(token: string): boolean {
        try {
            return Boolean(jwt.verify(token, this.accessTokenSecret))
        } catch {
            return false
        }
    }

    checkRefreshToken(token: string): boolean {
        try {
            return Boolean(jwt.verify(token, this.refreshTokenSecret))
        } catch {
            return false
        }
    }

}