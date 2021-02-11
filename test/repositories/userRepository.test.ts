import User from "../../src/models/user/user";
import UserStatus from "../../src/models/user/userStatus";
import UserMetrics from "../../src/models/user/userMetrics";
import UserRepository from "../../src/repositories/userRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';


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

    beforeEach(() => {
        clientSpy.mockClear();
    });

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
        mockedAxios.onPost("localhost/api/v1/users/login/").reply(403);

        await expect(repository.login("test@email.com", "wrongpassword")).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test register endpoint", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    beforeEach(() => {
        clientSpy.mockClear();
    });

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
        mockedAxios.onPost("localhost/api/v1/users/register/").reply(400);
        
        await expect(repository.register(
            "test", "test@email.com", "password", "password")).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test login mturk endpoint", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successfull call", async () => {
        const expectedValue = {
            "id": 1,
            "email": "test@mail",
            "username": "WORKERID0001",
            "token": "token",
            "profile": 1,
            "group": 1,
            "exp": 20
        }

        mockedAxios.onPost("localhost/api/v1/users/mturk/").reply(200, expectedValue);
        
        let response = await repository.loginMturk("WORKERID0001");

        expect(response).toBeInstanceOf(User);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/users/mturk/",
            {
                "workerId": "WORKERID0001"
            },
            undefined
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onPost("localhost/api/v1/users/mturk/").reply(400);
        
        await expect(repository.loginMturk("WORKERID0001")).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test get current user status", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

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
        mockedAxios.onGet("localhost/api/v1/users/status/").reply(400);
        
        await expect(repository.getCurrentUserStatus()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test get current user details", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successfull call", async () => {
        const expectedValue = {
            "id": 1,
            "email": "test@email.com",
            "username": "test",
            "token": undefined,
            "profile": 1,
            "group": 1,
            "exp": 20
        }

        mockedAxios.onGet("localhost/api/v1/users/details/").reply(200, expectedValue);
        
        let response = await repository.getCurrentUserDetails();
        expect(response).toBeInstanceOf(User);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/users/details/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("localhost/api/v1/users/details/").reply(400);
        
        await expect(repository.getCurrentUserDetails()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test get current user metrics", () => {
    let repository: UserRepository = userRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successfull call", async () => {
        const expectedValue = {
            "userId": 1,
            "annotatedDocuments": 1,
            "highAgreementCount": 1,
            "highAgreementPercentage": 0.5,
            "agreementRankingPosition": 1,
            "agreementRankingPercentage": 0.5,
            "annotatedMissions": 1,
            "annotatedTasks": 1
        }

        mockedAxios.onGet("localhost/api/v1/stats/users/1/").reply(200, expectedValue);
        
        let response = await repository.getUserMetrics(1);
        expect(response).toBeInstanceOf(UserMetrics);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "localhost/api/v1/stats/users/1/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("localhost/api/v1/stats/users/1/").reply(400);
        
        await expect(repository.getUserMetrics(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});
