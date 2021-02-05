import User from "../../src/models/user/user";
import UserRepository from "../../src/repositories/userRepository";
import { sessionManagerFixture, userFixture } from "../config/fixtures";


function sessionManagerAfterSetupFixture() {
    const sessionManager = sessionManagerFixture();
    const user: User = userFixture();
    sessionManager.setupUser(user);
    return sessionManager;
}


describe("Test setting up UserRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a SessionManager object", () => {
        let repository: UserRepository = new UserRepository(sessionManager)l
        expect(repository).toBeInstanceOf(UserRepository);
    });
});


