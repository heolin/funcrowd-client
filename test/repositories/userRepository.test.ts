import { AxiosResponse } from "axios";
import User from "../../src/models/user/user";
import UserRepository from "../../src/repositories/userRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import UserStatus from "../../src/models/user/userStatus";

function userRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: UserRepository = new UserRepository(sessionManager);
    return repository;
}


describe("Test setting up UserRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a SessionManager object", () => {
        let repository: UserRepository = new UserRepository(sessionManager);
        expect(repository).toBeInstanceOf(UserRepository);
    });
});


describe("Test login endpoint", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    it("Test successfull call", async () => {
        const expectedValue = {
            "id": 1,
            "email": "test@email.com",
            "username": "test",
            "token": "token",
            "profile": 1,
            "group": 1,
            "exp": 20
        }

        mockedAxios.onPost("localhost/api/v1/users/login/").reply(200, expectedValue);
        
        let response = await repository.login("test@email.com", "password");
        expect(response).toBeInstanceOf(User);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/users/login/",
            {
                "email": "test@email.com",
                "password": "password"
            },
            undefined
        );
    });
    
    it("Test failed call", async () => {
        let expectedValue = "error";
        mockedAxios.onPost("localhost/api/v1/users/login/").reply(403, expectedValue);

        await expect(repository.login("test@email.com", "wrongpassword")).rejects.toThrow();
    });
});


describe("Test register endpoint", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    it("Test successfull call", async () => {
        const expectedValue = "success";    
        mockedAxios.onPost("localhost/api/v1/users/register/").reply(204, expectedValue);
        
        let response = await repository.register(
            "test", "test@email.com", "password", "password");

        expect(response.data).toEqual(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/users/register/",
            {
                "username": "test",
                "email": "test@email.com",
                "password1": "password",
                "password2": "password"
            },
            undefined
        );
    });

    it("Test failed call", async () => {
        let expectedValue = "error";
        mockedAxios.onPost("localhost/api/v1/users/register/").reply(400, expectedValue);
        
        await expect(repository.register("test", "test@email.com", "password", "password")).rejects.toThrow();
    });
});


describe("Test get current user status", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    it("Test successfull call", async () => {
        const expectedValue = {
            "id": 3,
            "username": "test",
            "profile": 1,
            "exp": 20
        }

        mockedAxios.onGet("localhost/api/v1/users/status/").reply(200, expectedValue);
        
        let response = await repository.getCurrentUserStatus();
        expect(response).toBeInstanceOf(UserStatus);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/users/status/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        let expectedValue = "error";
        mockedAxios.onPost("localhost/api/v1/users/register/").reply(400, expectedValue);
        
        await expect(repository.register("test", "test@email.com", "password", "password")).rejects.toThrow();
    });
});
