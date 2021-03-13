import RankingRepository from "../../src/repositories/rankingRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import MockAdapter from 'axios-mock-adapter';
import Ranking from "../../src/models/ranking/ranking";


function rankingRepositoryFixture() {
    let sessionManager = sessionManagerAfterSetupFixture();
    let repository: RankingRepository = new RankingRepository(sessionManager);
    return repository;
}


describe("Test setting up RankingRepository", () => {
    let sessionManager = sessionManagerAfterSetupFixture();
    
    it("Creating a RankingRepository object", () => {
        let repository: RankingRepository = new RankingRepository(sessionManager);
        expect(repository).toBeInstanceOf(RankingRepository);
        expect(repository.exp).not.toBe(undefined);
        expect(repository.annotations).not.toBe(undefined);
    });
});


describe("Test annotations.global endpoint", () => {
    let repository: RankingRepository = rankingRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "rows": [
                {
                    "position": 1,
                    "userId": 1,
                    "username": "user1",
                    "value": 9
                }
            ]
        }

        mockedAxios.onGet("/localhost/api/v1/ranking/annotations/top/?page=0&size=10").reply(200, expectedValue['rows']);
                
        let response = await repository.annotations.global();
        expect(response).toBeInstanceOf(Ranking);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/ranking/annotations/top/?page=0&size=10",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/ranking/annotations/top/?page=0&size=10").reply(400);
        
        await expect(repository.annotations.global()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test annotations.user endpoint", () => {
    let repository: RankingRepository = rankingRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "rows": [
                {
                    "position": 1,
                    "userId": 1,
                    "username": "user1",
                    "value": 9
                }
            ]
        }

        mockedAxios.onGet("/localhost/api/v1/ranking/annotations/around/1/?size=0").reply(200, expectedValue['rows']);
                
        let response = await repository.annotations.user(1);
        expect(response).toBeInstanceOf(Ranking);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/ranking/annotations/around/1/?size=0",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/ranking/annotations/around/1/?size=0").reply(400);
        
        await expect(repository.annotations.user(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


//
describe("Test exp.global endpoint", () => {
    let repository: RankingRepository = rankingRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "rows": [
                {
                    "position": 1,
                    "userId": 1,
                    "username": "user1",
                    "value": 9
                }
            ]
        }

        mockedAxios.onGet("/localhost/api/v1/ranking/exp/top/?page=0&size=10").reply(200, expectedValue['rows']);
                
        let response = await repository.exp.global();
        expect(response).toBeInstanceOf(Ranking);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/ranking/exp/top/?page=0&size=10",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/ranking/exp/top/?page=0&size=10").reply(400);
        
        await expect(repository.exp.global()).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});


describe("Test exp.user endpoint", () => {
    let repository: RankingRepository = rankingRepositoryFixture();
    let _client = repository['_sessionManager']['_client'];
    let mockedAxios = new MockAdapter(_client);
    const clientSpy = jest.spyOn(_client, 'get');

    beforeEach(() => {
        clientSpy.mockClear();
    });

    it("Test successful call", async () => {
        const expectedValue = {
            "rows": [
                {
                    "position": 1,
                    "userId": 1,
                    "username": "user1",
                    "value": 9
                }
            ]
        }

        mockedAxios.onGet("/localhost/api/v1/ranking/exp/around/1/?size=0").reply(200, expectedValue['rows']);
                
        let response = await repository.exp.user(1);
        expect(response).toBeInstanceOf(Ranking);
        expect(response).toMatchObject(expectedValue);
        expect(clientSpy).toHaveBeenCalledWith(
            "/localhost/api/v1/ranking/exp/around/1/?size=0",
            {
                "headers":  {
                    "Authorization": "Token 12345"
                }
            }
        );
    });

    it("Test failed call", async () => {
        mockedAxios.onGet("/localhost/api/v1/ranking/exp/around/1/?size=0").reply(400);
        
        await expect(repository.exp.user(1)).rejects.toThrow();
        expect(clientSpy).toHaveBeenCalled();
    });
});
