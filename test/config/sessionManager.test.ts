import ConfigBuilder from "../../src/session/configBuilder";
import SessionManager from "../../src/session/sessionManager";
import User from "../../src/models/user/user";
import { configBuilderFixture, sessionManagerFixture, userFixture } from "./fixtures";
import { AxiosResponse } from "axios";


describe("Test SessionManager", () => {
    const configBuilder: ConfigBuilder = configBuilderFixture();
    const user: User = userFixture();
    const baseUrl: string = "localhost";

    it("Creating a SessionManager object", () => {
        let manager: SessionManager = new SessionManager(baseUrl, configBuilder);
        expect(manager).toBeInstanceOf(SessionManager);
        expect(manager.config).toBeUndefined();
        expect(manager.user).toBeUndefined();

    });

    it("Setting up user", () => {
        let manager: SessionManager = sessionManagerFixture();
        manager.setupUser(user);

        expect(manager.config).not.toBeUndefined();
        expect(manager.user).toBeInstanceOf(User);      
    });

    it("Test client for unlogged user", () => {
        let manager: SessionManager = sessionManagerFixture();
         
    });

    it("Test client for logged user", () => {
        let manager: SessionManager = sessionManagerFixture();
        manager.setupUser(user); 
    });

    it("Test client without the config", () => {
        let manager: SessionManager = sessionManagerFixture();
         
    });
});
