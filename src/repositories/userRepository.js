"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var user_1 = require("../models/user/user");
var userStatus_1 = require("../models/user/userStatus");
var userDetails_1 = require("../models/user/userDetails");
var userStats_1 = require("../models/user/userStats");
/**
 *
 */
var UserRepository = /** @class */ (function () {
    function UserRepository(_sessionManager) {
        this._sessionManager = _sessionManager;
    }
    /**
     * Basic function used to login the user into the service.
     * @param email - user's email
     * @param password - user's password
     * @returns an User object containing information of logged in user
     */
    UserRepository.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/login/'), {
                            email: email,
                            password: password
                        })];
                    case 1:
                        response = _a.sent();
                        user = user_1["default"].fromJson(response.data);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * Creates a new account for the user based on provided credentials.
     * @param username - user's username
     * @param email - user's email
     * @param password1 - user's password
     * @param password2 - repeated password
     * @returns
     */
    UserRepository.prototype.register = function (username, email, password1, password2) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/register/'), {
                            username: username,
                            email: email,
                            password1: password1,
                            password2: password2
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     *
     * @param username
     * @returns
     */
    UserRepository.prototype.changeSettings = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/change_settings/'), {
                            username: username
                        }, this._sessionManager.getAuthHeader())];
                    case 1:
                        response = _a.sent();
                        user = user_1["default"].fromJson(response.data);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @param oldPassword
     * @param newPassword1
     * @param newPassword2
     * @returns
     */
    UserRepository.prototype.changePassword = function (oldPassword, newPassword1, newPassword2) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/change_password/'), {
                            old_password: oldPassword,
                            new_password1: newPassword1,
                            new_password2: newPassword2
                        }, this._sessionManager.getAuthHeader())];
                    case 1:
                        response = _a.sent();
                        user = user_1["default"].fromJson(response.data);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @param email
     * @returns
     */
    UserRepository.prototype.resetPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/reset_password/'), {
                            email: email
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * @param resetToken
     * @param password1
     * @param password2
     * @returns
     */
    UserRepository.prototype.changePasswordWithResetToken = function (resetToken, password1, password2) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/reset_password/token/'), {
                            token: resetToken,
                            password1: password1,
                            password2: password2
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * @param activationToken
     * @returns
     */
    UserRepository.prototype.activateAccount = function (activationToken) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/activate/'), {
                            token: activationToken
                        })];
                    case 1:
                        response = _a.sent();
                        user = user_1["default"].fromJson(response.data);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @param token
     * @returns
     */
    UserRepository.prototype.resetActivationToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                response = axios_1["default"].post(this._sessionManager.createUrl('users/activate/renew/'), {
                    token: token
                });
                return [2 /*return*/, response];
            });
        });
    };
    /**
     * @param workerId
     * @returns
     */
    UserRepository.prototype.loginMturk = function (workerId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].post(this._sessionManager.createUrl('users/mturk/'), {
                            worker_id: workerId
                        })];
                    case 1:
                        response = _a.sent();
                        user = user_1["default"].fromJson(response.data);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    /**
     * @returns
     */
    UserRepository.prototype.getCurrentUserStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this._sessionManager.createUrl('users/status/'), this._sessionManager.getAuthHeader())];
                    case 1:
                        response = _a.sent();
                        status = userStatus_1["default"].fromJson(response.data);
                        return [2 /*return*/, status];
                }
            });
        });
    };
    /**
     * @returns
     */
    UserRepository.prototype.getCurrentUserDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, details;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this._sessionManager.createUrl('users/details/'), this._sessionManager.getAuthHeader())];
                    case 1:
                        response = _a.sent();
                        details = userDetails_1["default"].fromJson(response.data);
                        return [2 /*return*/, details];
                }
            });
        });
    };
    /**
     * @param workerId
     * @returns
     */
    UserRepository.prototype.getUserStats = function (workerId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get(this._sessionManager.createUrl('stats/users/' + workerId + '/'), this._sessionManager.getAuthHeader())];
                    case 1:
                        response = _a.sent();
                        stats = userStats_1["default"].fromJson(response.data);
                        return [2 /*return*/, stats];
                }
            });
        });
    };
    return UserRepository;
}());
exports["default"] = UserRepository;
