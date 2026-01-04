export type AccessTokenClaims = {
    name: string;
    lastName: string;
    email: string;
}

export abstract class TokenService {
    abstract generateAccessToken(userId: string, claims: AccessTokenClaims): string;
    abstract generateRefreshToken(userId: string): string;
    abstract checkAccessToken(token: string): boolean;
    abstract checkRefreshToken(token: string): boolean;
}