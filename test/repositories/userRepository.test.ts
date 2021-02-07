import User from "../../src/models/user/user";
import UserRepository from "../../src/repositories/userRepository";
import { sessionManagerAfterSetupFixture } from "../config/fixtures";
import { mockedAxiosFixture, PromiseOutcome } from "./fixtures";


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

    it("Test successfull call", async () => {
        const expectedValue = {
            "email": "test@email.com",
            "username": "test",
            "token": "token",
            "profile": 1,
            "group": 1,
            "exp": 20
        }
    
        let mockedAxios = mockedAxiosFixture("post", PromiseOutcome.resolve, expectedValue);
        
        let response = await repository.login("test@email.com", "password");
        expect(response).toBeInstanceOf(User);
        expect(response).toMatchObject(expectedValue);
        expect(mockedAxios).toHaveBeenCalledWith(
            "localhost/api/v1/users/login/",
            {
                "email": "test@email.com",
                "password": "password"
            }
        );
    });

    it("Test failed call", async () => {
        let expectedValue = "error";
        mockedAxiosFixture("post", PromiseOutcome.reject, expectedValue);
        
        expect(repository.login("test@email.com", "wrongpassword")).rejects.toEqual({data: expectedValue});
    });
});