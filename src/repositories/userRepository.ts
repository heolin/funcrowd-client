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
     * Using this endpoint will send an activation email to the provided email.
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
     * Used to change user settings. At the moment it supports only user's username.
     * @param username - a new username for the user
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
     * Used to replace user's password
     * @param oldPassword - current password
     * @param newPassword1 - new password
     * @param newPassword2 - repeated the same password
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
     * Activates user's reset email. An email with a reset link will be
     * sent to the provided email.
     * @param email - email that will receive a reset link
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
     * Used to reset password for a user that is not logged in. 
     * Instead of user's auth token it's uses a reset token that is
     * provided in a reset email.
     * @param resetToken - reset token
     * @param password1 - new password
     * @param password2 - repeated new password
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
     * Used to activate a new account using a token provided in
     * an activation email.
     * @param activationToken - activation email
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
     * Used to reset an activation token. Using this endpoint will disable current
     * activation token and resend an activation email with a new token.
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
     * Used to login an Mturk user based only on its workerId
     * @param workerId - id of an Mturk user, needs to fallow a specific format
     * characteristic for the Mturk platform
     * @returns
     */
    async loginMturk(workerId: string): Promise<User> {
    
        const response = await this._sessionManager.post(
            'users/mturk/',
            {
                workerId: workerId,
            },
            false
        );
        let user = User.fromJson(response.data);
        return user;
    }

    /**
     * Get status of currently logged in user
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
     * Gets details of currently logged in user
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
     * Get metrics of selected user
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
