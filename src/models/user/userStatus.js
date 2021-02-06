"use strict";
exports.__esModule = true;
/**
 *
 */
var UserStatus = /** @class */ (function () {
    function UserStatus(id, username, profile, exp) {
        this.id = id;
        this.username = username;
        this.profile = profile;
        this.exp = exp;
    }
    UserStatus.fromJson = function (data) {
        var object = new UserStatus(data.id, data.username, data.profile, data.exp);
        return object;
    };
    return UserStatus;
}());
exports["default"] = UserStatus;
