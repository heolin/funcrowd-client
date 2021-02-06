import { IUserStatus } from "./userStatus";


export interface IUser extends IUserStatus {
    email: string;
    group: number;
    token: Nullable<string>;
}


/**
 * 
 */
export default class User implements IUser {

    constructor(public id: number, public username: string, 
                public email:string, public profile: number, 
                public group: number, public exp: number,
                public token: Nullable<string>) {}

    static fromJson(data: IUser): User {
        let object = new User(data.id,
            data.username,
            data.email,
            data.profile,
            data.group,
            data.exp,
            data.token
        );
        return object;
    }
}
