import { IUserDetails } from "./userDetails";


export interface IUser extends IUserDetails {
    token: string;
}

/**
 * 
 */
export default class User implements IUser {

    constructor(public id: number, public username: string, 
                public email:string, public token:string,
                public profile: number, public group: number,
                public exp: number) {}

    static fromJson(data: IUser): User {
        let object = new User(data.id,
            data.username,
            data.email,
            data.token,
            data.profile,
            data.group,
            data.exp
        );
        return object;
    }
}
