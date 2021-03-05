import MissionRepository from "../../src/repositories/missionRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Mission from "../../src/models/mission/mission";
import MissionProgress from "../../src/models/mission/missionProgress";


function missionRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: MissionRepository = new MissionRepository(sessionManager);
    return repository;
}


describe("Test setting up MissionRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a MissionRepository object", () => {
        let repository: MissionRepository = new MissionRepository(sessionManager);
        expect(repository).toBeInstanceOf(MissionRepository);
    });
});

describe("Test list endpoint", () => {
    let repository: MissionRepository = missionRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "id": 1,
                "name": "mission 1",
                "description": "text",
                "tasksCount": 1,
                "achievementsCount": 4,
                "totalExp": 100,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/missions/").reply(200, expectedValue);
        
        let response = await repository.list();
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Mission);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/").reply(400);
        
        await expect(repository.list()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test get endpoint", () => {
    let repository: MissionRepository = missionRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {   
            "id": 1,
            "name": "mission 1",
            "description": "text",
            "tasksCount": 1,
            "achievementsCount": 4,
            "totalExp": 100,
            "metadata": {}
        }

        mockedAxios.onGet("/localhost/api/v1/missions/1/").reply(200, expectedValue);
        
        let response = await repository.get(1);
        expect(response).toBeInstanceOf(Mission);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/1/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/1/").reply(400);
        
        await expect(repository.get(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test progressList endpoint", () => {
    let repository: MissionRepository = missionRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "missionId": 1,
                "tasksDone": 1,
                "tasksCount": 1,
                "progress": 0.5,
                "status": "IN_PROGRESS"
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/missions/progress/").reply(200, expectedValue);
        
        let response = await repository.progressList();
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(MissionProgress);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/progress/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/progress/").reply(400);
        
        await expect(repository.progressList()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test progress endpoint", () => {
    let repository: MissionRepository = missionRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "missionId": 1,
            "tasksDone": 1,
            "tasksCount": 1,
            "progress": 0.5,
            "status": "IN_PROGRESS"
        }

        mockedAxios.onGet("/localhost/api/v1/missions/1/progress/").reply(200, expectedValue);
        
        let response = await repository.progress(1);
        expect(response).toBeInstanceOf(MissionProgress);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/1/progress/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/1/progress/").reply(400);
        
        await expect(repository.progress(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});
