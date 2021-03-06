import TaskRepository from "../../src/repositories/taskRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Task from "../../src/models/task/task";
import TaskProgress from "../../src/models/task/taskProgress";


function taskRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: TaskRepository = new TaskRepository(sessionManager);
    return repository;
}


describe("Test setting up TaskRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a StorageRepository object", () => {
        let repository: TaskRepository = new TaskRepository(sessionManager);
        expect(repository).toBeInstanceOf(TaskRepository);
    });
});


describe("Test list endpoint", () => {
    let repository: TaskRepository = taskRepositoryFixture();
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
                "missionId": 1,
                "name": "task 1",
                "description": "text",
                "instruction": "test",
                "keywords": ["first", "second"],
                "achievementsCount": 4,
                "totalExp": 100,
                "metadata": {}
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/missions/1/tasks/").reply(200, expectedValue);
        
        let response = await repository.list(1);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Task);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/1/tasks/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/1/tasks/").reply(400);
        
        await expect(repository.list(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test get endpoint", () => {
    let repository: TaskRepository = taskRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "id": 1,
            "missionId": 1,
            "name": "task 1",
            "description": "text",
            "instruction": "test",
            "keywords": ["first", "second"],
            "achievementsCount": 4,
            "totalExp": 100,
            "metadata": {}
        }

        mockedAxios.onGet("/localhost/api/v1/tasks/1/").reply(200, expectedValue);
        
        let response = await repository.get(1);
        expect(response).toBeInstanceOf(Task);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/tasks/1/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/tasks/1/").reply(400);
        
        await expect(repository.get(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test progressList endpoint", () => {
    let repository: TaskRepository = taskRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "taskId": 1,
                "itemsDone": 1,
                "itemsCount": 1,
                "progress": 0.5,
                "status": "IN_PROGRESS",
                "maxScore": 10,
                "score": 1
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/missions/1/tasks/progress/").reply(200, expectedValue);
        
        let response = await repository.progressList(1);
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(TaskProgress);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/missions/1/tasks/progress/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/missions/1/tasks/progress/").reply(400);
        
        await expect(repository.progressList(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test progress endpoint", () => {
    let repository: TaskRepository = taskRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "taskId": 1,
            "itemsDone": 1,
            "itemsCount": 1,
            "progress": 0.5,
            "status": "IN_PROGRESS",
            "maxScore": 10,
            "score": 1
        }

        mockedAxios.onGet("/localhost/api/v1/tasks/1/progress/").reply(200, expectedValue);
        
        let response = await repository.progress(1);
        expect(response).toBeInstanceOf(TaskProgress);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/tasks/1/progress/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/tasks/1/progress/").reply(400);
        
        await expect(repository.progress(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});
