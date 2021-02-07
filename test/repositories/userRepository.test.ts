import axios, { AxiosResponse } from 'axios';

import User, { IUser } from "../../src/models/user/user";
import UserRepository from "../../src/repositories/userRepository";
import { sessionManagerFixture, userFixture } from "../config/fixtures";


function sessionManagerAfterSetupFixture() {
    const sessionManager = sessionManagerFixture();
    const user: User = userFixture();
    sessionManager.setupUser(user);
    return sessionManager;
}

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

    const expectedValue = {
        "email": "test@email.com",
        "username": "test",
        "token": "token",
        "profile": 1,
        "group": 1,
        "exp": 20
    }

    const feedResponsePromise = Promise.resolve({ data: expectedValue } as AxiosResponse);
    const mockedAxios = jest.spyOn(axios, "post");
    mockedAxios.mockReturnValueOnce(feedResponsePromise);    

    it("Test successfull call", async () => {
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
});