export type AccessTokenClaims = {
    name: string;
    lastName: string;
    email: string;
}

export type AccessTokenPayload = {
    userId: string;
} & AccessTokenClaims

export type RefreshTokenPayload = {
    userId: string;
}

export abstract class TokenService {
    abstract generateAccessToken(userId: string, claims: AccessTokenClaims): string;
    abstract generateRefreshToken(userId: string): string;
    abstract checkAccessToken(token: string): boolean;
    abstract checkRefreshToken(token: string): boolean;
    abstract decodeRefreshToken(token: string): RefreshTokenPayload
    abstract decodeAccessToken(token: string): AccessTokenPayload
}