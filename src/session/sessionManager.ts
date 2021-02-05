import ConfigBuilder from "./configBuilder";
import User from "../models/user/user";
import {UserUndefinedError} from "./errors";

const API_URL = "/api/v1/";


/**
 * 
 */
export default class SessionManager {
    private _configBuilder: ConfigBuilder;
    private _user: Nullable<User>;
    private _config: Nullable<Object>;
    private _baseUrl: string;

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
    }

    /**
     * Used to setup new user after the login it. 
     * It will create a proper config object based on selected configBuilder. 
     * @param user 
     */
    setupUser(user: User): void {
        this._user = user;
        this._config = this._configBuilder.create();
    }

    /**
     * Used to create a full url to the backend service.
     * @param endpoint - name of the endpoint, e.g. `user/stats`
     * @return generated url to the backend API
     */
    createUrl(endpoint: string): string {
        return this._baseUrl + API_URL + endpoint;
    }

    /**
     * 
     */
    getAuthHeader(): Object {
        if (this.user) {
            return {
                headers: {
                    Authorization: "Token " + this.user.token
                }
            };
        } else {
            throw new UserUndefinedError(
                "User is undefined. You need to setup the user first.")
        }
    }
}
