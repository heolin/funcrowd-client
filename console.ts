import Context from "./src/context";
import User from "./src/models/user/user";
import UserRepository from "./src/repositories/userRepository";
import ConfigBuilder from "./src/session/configBuilder";
import SessionManager from "./src/session/sessionManager";

const authToken = '1e0761425a2655ba3ba6e315dbdb1fb764776018';

const backendUrl = "http://funcrowd.herokuapp.com";
let sessionManager: SessionManager = new SessionManager(
    backendUrl,
    new ConfigBuilder()
);

let context = new Context(sessionManager);

let userRepository: UserRepository = context.repositories.userRepository;

userRepository.login("admin@admin.pl", "Wojtek1234").then((user) => {
    console.log(user);
});


sessionManager.setupAuthToken(authToken);

userRepository.getCurrentUserDetails().then((user) => {
    user.token = authToken;
    console.log(user);
});
