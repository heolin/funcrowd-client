import axios, {AxiosResponse} from 'axios';
import SessionManager from "../session/sessionManager";

import UserStatus from "../models/user/userStatus";
import User from "../models/user/user";
import UserMetrics from "../models/user/userMetrics";

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
        const response = await this._sessionManager.post(
            'users/login/',
            {
                email: email,
                password: password
            },
            false
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
        const response = await this._sessionManager.post(
            'users/register/',
            {
                username: username,
                email: email,
                password1: password1,
                password2: password2
            },
            false
        );
        return response;
    }

    /**
     * 
     * @param username
     * @returns
     */
    async changeSettings(username: string): Promise<UserStatus> {
        const response = await this._sessionManager.post(
            'users/change_settings/',
            {
                username: username
            }
        );
        let user = UserStatus.fromJson(response.data);
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
                        newPassword2: string): Promise<AxiosResponse> {
        const response = await this._sessionManager.post(
            'users/change_password/',
            {
                oldPassword: oldPassword,
                newPassword1: newPassword1,
                newPassword2: newPassword2
            }
        );
        return response;
    }

    /**
     * @param email
     * @returns
     */
    async resetPassword(email: string): Promise<AxiosResponse> {
        const response = await this._sessionManager.post(
            'users/reset_password/',
            {
                email: email,
            },
            false
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
        const response = await this._sessionManager.post(
            'users/reset_password/token/',
            {
                token: resetToken,
                password1: password1,
                password2: password2
            },
            false
        );
        return response;
    }

    /**
     * @param activationToken
     * @returns
     */
    async activateAccount(activationToken: string): Promise<User> { 
        const response = await this._sessionManager.post(
            'users/activate/',
            {
                token: activationToken,
            },
            false
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @param activationToken
     * @returns
     */
    async resetActivationToken(activationToken: string): Promise<AxiosResponse> {       
        const response = await this._sessionManager.post(
            'users/activate/renew/',
            {
                token: activationToken,
            },
            false
        );
        return response;
    }

    /**
     * @param workerId
     * @returns
     */
    async loginMturk(workerUsername: string): Promise<User> {
    
        const response = await this._sessionManager.post(
            'users/mturk/',
            {
                workerId: workerUsername,
            },
            false
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * @returns
     */
    async getCurrentUserStatus(): Promise<UserStatus> {    
        const response = await this._sessionManager.get(
            'users/status/'
        );
        let status = UserStatus.fromJson(response.data);
        return status;
    }

    /**
     * @returns
     */
    async getCurrentUserDetails(): Promise<User> {
        const response = await this._sessionManager.get(
            'users/details/'
        );
        let details = User.fromJson(response.data);
        return details;
    }

    /**
     * @param workerId
     * @returns
     */
    async getUserMetrics(workerId: number): Promise<UserMetrics> {
        const response = await this._sessionManager.get(
            'stats/users/' + workerId + '/'
        );
        let metrics = UserMetrics.fromJson(response.data);
        return metrics;
    }
}
