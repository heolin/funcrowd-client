import TaskRepository from "../../src/repositories/taskRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Task from "../../src/models/task/task";


function taskRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: TaskRepository = new TaskRepository(sessionManager);
    return repository;
}


describe("Test setting up TaskRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a SessionManager object", () => {
        let repository: TaskRepository = new TaskRepository(sessionManager);
        expect(repository).toBeInstanceOf(TaskRepository);
    });
});

/*

    async list(missionId: number): Promise<Task[]> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/tasks/");

        let tasks: Task[] = response.data.map(
            (data: Object) => Task.fromJson(data as ITask));
        return tasks;
    }
*/



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
