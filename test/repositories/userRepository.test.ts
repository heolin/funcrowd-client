import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

import User from "../../src/models/user/user";
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

    it("Test successfull call", () => {
        repository.login("test@email.com", "password").then((response) => {
        });
        expect(mockedAxios.post).toHaveBeenCalledWith(
            "localhost/api/v1/users/login/",
            {
                "email": "test@email.com",
                "password": "password"
            }
        );
    });
});