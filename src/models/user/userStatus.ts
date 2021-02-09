
export interface IUserStatus {
    id: number;
    username: string;
    profile: number;
    exp: number;
}

/**
 * Stores basic information about the user.
 * Used mostly to get updates about the changes in user's exp.
 */
export default class UserStatus implements IUserStatus {

    constructor(public id: number, public username: string, 
                public profile: number, public exp: number) {}

    static fromJson(data: IUserStatus): UserStatus {
        let object = new UserStatus(data.id,
            data.username,
            data.profile,
            data.exp
        );
        return object;
    }
}
