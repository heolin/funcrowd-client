import ConfigBuilder from "../../src/session/configBuilder";
import SessionManager from "../../src/session/sessionManager";
import {UserUndefinedError} from "../../src/session/errors";
import User from "../../src/models/user/user";
import { configBuilderFixture, sessionManagerFixture, userFixture } from "./fixtures";


describe("Test SessionManager", () => {
    const configBuilder: ConfigBuilder = configBuilderFixture();
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
