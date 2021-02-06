import User from "./models/user/user";
import UserRepository from "./repositories/userRepository";
import ConfigBuilder from "./session/configBuilder";
import SessionManager from "./session/sessionManager";


let backendUrl = "http://funcrowd.herokuapp.com";
let sessionManager: SessionManager = new SessionManager(
    backendUrl,
    new ConfigBuilder()
);
let userRepository: UserRepository = new UserRepository(sessionManager);
userRepository.login("admin@admin.pl", "Wojtek1234").then((user) => {
    console.log(user);
});
