export class InvalidRefreshTokenError extends Error {
    code = "INVALID_REFRESH_TOKEN"

    constructor(){
        super("An invalid refresh token was provided")
    }
}