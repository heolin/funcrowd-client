"use strict";
exports.__esModule = true;
var errors_1 = require("./errors");
var API_URL = "/api/v1/";
/**
 *
 */
var SessionManager = /** @class */ (function () {
    /**
     * @param baseUrl - url of the Funcrowd backend service
     * @param configBuilder - instance of the ConfigBuilder class
     */
    function SessionManager(baseUrl, configBuilder) {
        this._baseUrl = baseUrl;
        this._configBuilder = configBuilder;
    }
    Object.defineProperty(SessionManager.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionManager.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Used to setup new user after the login it.
     * It will create a proper config object based on selected configBuilder.
     * @param user
     */
    SessionManager.prototype.setupUser = function (user) {
        this._user = user;
        this._config = this._configBuilder.create();
    };
    /**
     * Used to create a full url to the backend service.
     * @param endpoint - name of the endpoint, e.g. `user/stats`
     * @return generated url to the backend API
     */
    SessionManager.prototype.createUrl = function (endpoint) {
        return this._baseUrl + API_URL + endpoint;
    };
    /**
     *
     */
    SessionManager.prototype.getAuthHeader = function () {
        if (this.user) {
            return {
                headers: {
                    Authorization: "Token " + this.user.token
                }
            };
        }
        else {
            throw new errors_1.UserUndefinedError("User is undefined. You need to setup the user first.");
        }
    };
    return SessionManager;
}());
exports["default"] = SessionManager;
