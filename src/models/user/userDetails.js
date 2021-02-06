"use strict";
exports.__esModule = true;
/**
 *
 */
var UserDetails = /** @class */ (function () {
    function UserDetails(id, username, email, profile, group, exp) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profile = profile;
        this.group = group;
        this.exp = exp;
    }
    UserDetails.fromJson = function (data) {
        var object = new UserDetails(data.id, data.username, data.email, data.profile, data.group, data.exp);
        return object;
    };
    return UserDetails;
}());
exports["default"] = UserDetails;
