import ConfigBuilder from "./configBuilder";
import User from "../models/user/user";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import urlJoin from 'proper-url-join';


const API_URL = "/api/v1/";


/**
 * 
 */
export default class SessionManager {
    private _configBuilder: ConfigBuilder;
    private _user: Nullable<User>;
    private _authToken: Nullable<string>;
    private _config: Nullable<Object>;
    private _baseUrl: string;
    private _client: AxiosInstance;

    get config(): Nullable<Object> {
        return this._config;
    }

    get user(): Nullable<User> {
        return this._user;
    }

    /**
     * @param baseUrl - url of the Funcrowd backend service
     * @param configBuilder - instance of the ConfigBuilder class
     */
    constructor(baseUrl: string, configBuilder: ConfigBuilder) {
        this._baseUrl = baseUrl;
        this._configBuilder = configBuilder;
        this._client = axios.create();
    }

    /**
     * Used to setup new user after the login it. 
     * It will setup an authentication token using value from `user` object.
     * Notice, if `user.token` is undefined the token will be set to undefined too.
     * It will create a proper config object based on selected configBuilder. 
     * @param user 
     */
    setupUser(user: User): void {
        this._user = user;
        this._authToken = user.token;
        this._config = this._configBuilder.create();
    }

    /**
     * Used to logout the user.
     * Clears the authToken and current config.
     */
    logoutUser(): void {
        this._user = undefined;
        this._authToken = undefined;
        this._config = undefined;
    }

    /**
     * Used to setup authentication token without setting up the whole user.
     * @param authToken - authentication token for active user
     */
    setupAuthToken(authToken: string): void {
        this._authToken = authToken;
    }

    /**
     * Wrapper around axios's get that sill change 
     * @param endpoint
     * @param useConfig 
     */
    get(endpoint: string, useConfig: boolean = true): Promise<AxiosResponse> {
        return this._client.get(
            this._createUrl(endpoint), useConfig ? this._getAuthConfig() : undefined);
    }

    /**
     * 
     * @param endpoint
     * @param data 
     * @param useConfig 
     */
    post(endpoint: string, data?: any, useConfig: boolean = true): Promise<AxiosResponse> {
        return this._client.post(
            this._createUrl(endpoint), data, useConfig ? this._getAuthConfig() : undefined);
    }

    /**
     * Used to create a full url to the backend service.
     * @param endpoint - name of the endpoint, e.g. `user/stats`
     * @return generated url to the backend API
     */
    private _createUrl(endpoint: string): string {
        let url = urlJoin(this._baseUrl, API_URL, endpoint, { trailingSlash: true });
        return url;
    }

    /**
     * 
     */
    private _getAuthConfig(): AxiosRequestConfig | undefined {
        if (this._authToken) {
            return {
                headers: {
                    Authorization: "Token " + this._authToken
                }
            };
        }
    }
}
