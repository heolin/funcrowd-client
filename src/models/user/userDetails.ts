import { IUserStatus } from "./userStatus";


export interface IUserDetails extends IUserStatus {
    email: string;
    group: number;
}


/**
 * 
 */
export default class UserDetails implements IUserDetails {

    constructor(public id: number, public username: string, 
                public email:string, public profile: number, 
                public group: number, public exp: number) {}

    static fromJson(data: IUserDetails): UserDetails {
        let object = new UserDetails(data.id,
            data.username,
            data.email,
            data.profile,
            data.group,
            data.exp
        );
        return object;
    }
}
