import ConfigBuilder from "../../src/session/configBuilder";
import SessionManager from "../../src/session/sessionManager";
import User from "../../src/models/user/user";
import { configBuilderFixture, sessionManagerFixture, userFixture } from "./fixtures";
import MockAdapter from "axios-mock-adapter";


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

    it("Setting up and logging out the user", () => {
        let manager: SessionManager = sessionManagerFixture();
        manager.setupUser(user);

        expect(manager.config).not.toBeUndefined();
        expect(manager.user).toBeInstanceOf(User);

        manager.logoutUser();

        expect(manager.config).toBeUndefined();
        expect(manager.user).toBeUndefined();
    });
});

describe("Test client", () => {
    const manager: SessionManager = sessionManagerFixture();
    const _client = manager['_client'];
    const clientSpy = jest.spyOn(_client, 'get');
    const mockedAxios = new MockAdapter(_client);
    mockedAxios.onGet("/localhost/api/v1/test/").reply(200);

    it("Test successfull GET call", () => {

        manager.get('test');
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/test/",
            undefined
        );
    });
});


describe("Test client with logged user", () => {
    const manager: SessionManager = sessionManagerFixture();
    const _client = manager['_client'];
    const clientSpy = jest.spyOn(_client, 'get');
    const mockedAxios = new MockAdapter(_client);
    mockedAxios.onGet("/localhost/api/v1/test/").reply(200);
    const user: User = userFixture();
    manager.setupUser(user);

    it("Test successfull call with logged user", () => {
        
        manager.get('test');
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/test/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test force no config", () => {
        manager.get('test', false);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/test/",
            undefined
        );
    });
});
