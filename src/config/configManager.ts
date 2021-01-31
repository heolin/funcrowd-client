import ConfigBuilder from "./configBuilder";
import User from "../models/user/user";


export default class ConfigManager {
    /**
     * 
     */

    private _configBuilder: ConfigBuilder;
    private _user: Nullable<User>;
    private _config: Nullable<Object>;

    constructor(configBuilder: ConfigBuilder) {
        this._configBuilder = configBuilder;
    }

    setupUser(user: User): void {
        /**
         * Used to setup new user after the login it. 
         * It will create a proper config object based on selected configBuilder. 
         * @param user 
         */
        if (!this._configBuilder)
            throw Error("The user setup failed. Variable configBuilder is not defined.")

        this._user = user;
        this._config = this._configBuilder.create();
    }

    get config(): Nullable<Object> {
        return this._config;
    }

    get user(): Nullable<User> {
        return this._user;
    }
}
