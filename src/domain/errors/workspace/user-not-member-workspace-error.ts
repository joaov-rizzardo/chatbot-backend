export class UserNotMemberWorkspaceError extends Error {
    code = "USER_NOT_MEMBER_WORKSPACE"

    constructor(){
        super("User isn't a member of the desired workspace")
    }
}