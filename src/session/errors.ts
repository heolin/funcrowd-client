import User from "../models/user/user";


/**
 * Error which is executed when user was not setup in SessionManager
 */
export class UserUndefinedError extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, UserUndefinedError.prototype);
    }
}
