export class BadCredentialsError extends Error {
    public code = "BAD_CREDENTIALS"

    constructor(){
        super("The email or password provided is incorrect")
    }
}