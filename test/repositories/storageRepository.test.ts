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

