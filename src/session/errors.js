"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserUndefinedError = void 0;
/**
 * Error which is executed when user was not setup in SessionManager
 */
var UserUndefinedError = /** @class */ (function (_super) {
    __extends(UserUndefinedError, _super);
    function UserUndefinedError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, UserUndefinedError.prototype);
        return _this;
    }
    return UserUndefinedError;
}(Error));
exports.UserUndefinedError = UserUndefinedError;
