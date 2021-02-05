import ConfigBuilder from "../../src/session/configBuilder";
import SessionManager from "../../src/session/sessionManager";
import {UserUndefinedError} from "../../src/session/errors";
import User from "../../src/models/user/user";


function userFixture() {
    return User.fromJson({
        'id': 1,
        'username': 'sample',
        'email': 'sample@email.com',
        'token': '12345',
        'profile': 2,
        'group': 2,
        'exp': 100
    });
}

function sessionManagerFixture() {
    return new SessionManager(
        "localhost",
        configBuilderFixture()
    );
}

function configBuilderFixture() {
    return new ConfigBuilder();
}


describe("Test SessionManager", () => {
    const configBuilder: ConfigBuilder = new ConfigBuilder();
    const user: User = userFixture();
    const baseUrl: string = "localhost";

    it("Creating a SessionManager object", () => {
        let manager: SessionManager = new SessionManager(baseUrl, configBuilder);
        expect(manager).toBeInstanceOf(SessionManager);
        expect(manager.config).toBeUndefined();
        expect(manager.user).toBeUndefined();

        try {
            manager.getAuthHeader()
        } catch(e) {
            expect(e).toBeInstanceOf(UserUndefinedError);
        }
    });

    it("Setting up user", () => {
        let manager: SessionManager = sessionManagerFixture();
        manager.setupUser(user);

        expect(manager.config).not.toBeUndefined();
        expect(manager.user).toBeInstanceOf(User);      
    });
});
