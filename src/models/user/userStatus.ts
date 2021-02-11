
export interface IUserStatus {
    id: number;
    username: string;
    exp: number;
}

/**
 * Stores basic information about the user.
 * Used mostly to get updates about the changes in user's exp.
 */
export default class UserStatus implements IUserStatus {

    constructor(public id: number, public username: string, 
                public exp: number) {}

    static fromJson(data: IUserStatus): UserStatus {
        let object = new UserStatus(data.id,
            data.username,
            data.exp
        );
        return object;
    }
}
