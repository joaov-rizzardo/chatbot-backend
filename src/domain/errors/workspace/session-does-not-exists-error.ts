export class SessionDoesNotExistsError extends Error {
    code = "SESSION_DOES_NOT_EXISTS"

    constructor(){
        super("The current session doesn't exists")
    }
}