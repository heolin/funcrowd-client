import AchievementRepository from "../../src/repositories/achievementRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Achievement from "../../src/models/achievement/achievement";


function achievementRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: AchievementRepository = new AchievementRepository(sessionManager);
    return repository;
}


describe("Test setting up AchievementRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a AchievementRepository object", () => {
        let repository: AchievementRepository = new AchievementRepository(sessionManager);
        expect(repository).toBeInstanceOf(AchievementRepository);
    });
});


describe("Test list endpoint", () => {
    let repository: AchievementRepository = achievementRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "id": 3,
                "order": 3,
                "status": "NEW",
                "value": 0,
                "target": 1,
                "progress": 0,
                "updated": "2021-03-07T18:09:29.683119Z",
                "exp": 30,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/achievements/").reply(200, expectedValue);
        
        let response = await repository.list();
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Achievement);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/achievements/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/achievements/").reply(400);
        
        await expect(repository.list()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test listMission endpoint", () => {
    let repository: AchievementRepository = achievementRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "id": 3,
                "order": 3,
                "status": "NEW",
                "value": 0,
                "target": 1,
                "progress": 0,
                "updated": "2021-03-07T18:09:29.683119Z",
                "exp": 30,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/achievements/mission/1/").reply(200, expectedValue);
        
        let response = await repository.listMission(1);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Achievement);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/achievements/mission/1/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/achievements/mission/1/").reply(400);
        
        await expect(repository.listMission(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test listTask endpoint", () => {
    let repository: AchievementRepository = achievementRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "id": 3,
                "order": 3,
                "status": "NEW",
                "value": 0,
                "target": 1,
                "progress": 0,
                "updated": "2021-03-07T18:09:29.683119Z",
                "exp": 30,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/achievements/task/1/").reply(200, expectedValue);
        
        let response = await repository.listTask(1);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Achievement);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/achievements/task/1/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/achievements/task/1/").reply(400);
        
        await expect(repository.listTask(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test listUnclosed endpoint", () => {
    let repository: AchievementRepository = achievementRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "id": 3,
                "order": 3,
                "status": "NEW",
                "value": 0,
                "target": 1,
                "progress": 0,
                "updated": "2021-03-07T18:09:29.683119Z",
                "exp": 30,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/achievements/unclosed/").reply(200, expectedValue);
        
        let response = await repository.listUnclosed();
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Achievement);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/achievements/unclosed/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/achievements/unclosed/").reply(400);
        
        await expect(repository.listUnclosed()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});

