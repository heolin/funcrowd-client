import axios, {AxiosResponse} from 'axios';
import SessionManager from "../session/sessionManager";

import User from "../models/user/user";
import UserStatus from "../models/user/userStatus";
import UserDetails from "../models/user/userDetails";
import UserStats from "../models/user/userStats";

/**
 * 
 */
export default class UserRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Basic function used to login the user into the service.
     * @param email - user's email
     * @param password - user's password
     * @returns an User object containing information of logged in user
     */
    async login(email: string, password: string): Promise<User> {
        let url = this._sessionManager.createUrl('users/login/');
        console.log("POSTING");
        console.log(url);

        const response = await axios.post(
            this._sessionManager.createUrl('users/login/'),
            {
                email: email,
                password: password
            }
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * Creates a new account for the user based on provided credentials.
     * @param username - user's username
     * @param email - user's email
     * @param password1 - user's password
     * @param password2 - repeated password
     * @returns
     */
    async register(username: string, email: string,
                          password1: string, password2: string): Promise<AxiosResponse> {
        const response = await axios.post(
            this._sessionManager.createUrl('users/register/'),
            {
                username: username,
                email: email,
                password1: password1,
                password2: password2
            }
        );
        return response;
    }

    /**
     * 
     * @param username
     * @returns
     */
    async changeSettings(username: string): Promise<User> {
        const response = await axios.post(
            this._sessionManager.createUrl('users/change_settings/'),
            {
                username: username
            },
            this._sessionManager.getAuthHeader()
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @param oldPassword
     * @param newPassword1
     * @param newPassword2
     * @returns
     */
    async changePassword(oldPassword: string,
                                newPassword1: string,
                                newPassword2: string): Promise<User> {
        const response = await axios.post(
            this._sessionManager.createUrl('users/change_password/'),
            {
                old_password: oldPassword,
                new_password1: newPassword1,
                new_password2: newPassword2
            },
            this._sessionManager.getAuthHeader()
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @param email
     * @returns
     */
    async resetPassword(email: string): Promise<AxiosResponse> {
        const response = await axios.post(
            this._sessionManager.createUrl('users/reset_password/'),
            {
                email: email,
            }
        );
        return response
    }

    /**
     * @param resetToken
     * @param password1
     * @param password2
     * @returns
     */
    async changePasswordWithResetToken(resetToken: string, password1: string,
                               password2: string): Promise<AxiosResponse> {
        const response = await axios.post(
            this._sessionManager.createUrl('users/reset_password/token/'),
            {
                token: resetToken,
                password1: password1,
                password2: password2
            }
        );
        return response;
    }

    /**
     * @param activationToken
     * @returns
     */
    async activateAccount(activationToken: string): Promise<User> { 
        const response = await axios.post(
            this._sessionManager.createUrl('users/activate/'),
            {
                token: activationToken,
            }
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @param token
     * @returns
     */
    async resetActivationToken(token: string): Promise<AxiosResponse> {       
        const response = axios.post(
            this._sessionManager.createUrl('users/activate/renew/'),
            {
                token: token,
            }
        );
        return response;
    }

    /**
     * @param workerId
     * @returns
     */
    async loginMturk(workerId: string): Promise<User> {
    
        const response = await axios.post(
            this._sessionManager.createUrl('users/mturk/'),
            {
                worker_id: workerId,
            }
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @returns
     */
    async getCurrentUserStatus(): Promise<UserStatus> {    
        const response = await axios.get(
            this._sessionManager.createUrl('users/status/'),
            this._sessionManager.getAuthHeader()
        );
        let status = UserStatus.fromJson(response.data);
        return status;
    }

    /**
     * @returns
     */
    async getCurrentUserDetails(): Promise<UserDetails> {
        const response = await axios.get(
            this._sessionManager.createUrl('users/details/'),
            this._sessionManager.getAuthHeader()
        );
        let details = UserDetails.fromJson(response.data);
        return details;
    }

    /**
     * @param workerId
     * @returns
     */
    async getUserStats(workerId: string): Promise<UserStats> {
        const response = await axios.get(
            this._sessionManager.createUrl('stats/users/' + workerId + '/'),
            this._sessionManager.getAuthHeader()
        );
        let stats = UserStats.fromJson(response.data);
        return stats;
    }
}
