export class UserNotExistsError extends Error {
    code = "USER_NOT_EXISTS"
    message: string = "User not exists"
}