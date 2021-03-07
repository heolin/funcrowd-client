import StorageRepository from "../../src/repositories/storageRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Storage from "../../src/models/storage/storage";


function storageRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: StorageRepository = new StorageRepository(sessionManager);
    return repository;
}


describe("Test setting up StorageRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a StorageRepository object", () => {
        let repository: StorageRepository = new StorageRepository(sessionManager);
        expect(repository).toBeInstanceOf(StorageRepository);
    });
});


describe("Test get endpoint", () => {
    let repository: StorageRepository = storageRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "key": "test",
            "data": "test"
        }

        mockedAxios.onGet("/localhost/api/v1/users/storage/test/").reply(200, expectedValue);
        
        let response = await repository.get("test");
        expect(response).toBeInstanceOf(Storage);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/users/storage/test/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/users/storage/test/").reply(400);
        
        await expect(repository.get("test")).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test post endpoint", () => {
    let repository: StorageRepository = storageRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "key": "test",
            "data": "test"
        }
    
        mockedAxios.onPost("/localhost/api/v1/users/storage/test/").reply(200, expectedValue);
        
        let response = await repository.post("test", {"data": "test"});
        expect(response).toBeInstanceOf(Storage);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/users/storage/test/",
            {
                "data": "test"
            },
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onPost("/localhost/api/v1/users/storage/test/").reply(400);
        
        await expect(repository.post("test", {"data": "test"})).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test list endpoint", () => {
    let repository: StorageRepository = storageRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "key": "test",
                "data": "test"
            }
        ]

        mockedAxios.onGet("/localhost/api/v1/users/storage/").reply(200, expectedValue);
        
        let response = await repository.list();
        expect(response.length).toBe(1);
        expect(response[0]).toBeInstanceOf(Storage);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/users/storage/",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/users/storage/").reply(400);
        
        await expect(repository.list()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test postBatch endpoint", () => {
    let repository: StorageRepository = storageRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'post');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = [
            {
                "key": "test",
                "data": "test"
            },
            {
                "key": "test2",
                "data": "test2"
            }
        ]
        
        mockedAxios.onPost("/localhost/api/v1/users/storage/").reply(200, expectedValue);
        
        let response = await repository.postBatch(expectedValue);
        expect(response.length).toBe(2);
        expect(response[0]).toBeInstanceOf(Storage);
        expect(response[0]).toMatchObject(expectedValue[0]);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/users/storage/",
            expectedValue,
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onPost("/localhost/api/v1/users/storage/").reply(400);
        
        await expect(repository.postBatch([
            {"key": "test", "data": "test"}
        ])).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});
