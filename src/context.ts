import UserRepository from "./repositories/userRepository";
import SessionManager from "./session/sessionManager"

class ContextRepositories {
    constructor(public userRepository: UserRepository) {}
}


export default class Context {
    repositories: ContextRepositories;

    constructor(public sessionManager: SessionManager) {
        this.repositories = new ContextRepositories(
            new UserRepository(sessionManager)
        );
    }
}
