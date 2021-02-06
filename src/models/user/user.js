"use strict";
exports.__esModule = true;
/**
 *
 */
var User = /** @class */ (function () {
    function User(id, username, email, token, profile, group, exp) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
        this.profile = profile;
        this.group = group;
        this.exp = exp;
    }
    User.fromJson = function (data) {
        var object = new User(data.id, data.username, data.email, data.token, data.profile, data.group, data.exp);
        return object;
    };
    return User;
}());
exports["default"] = User;
