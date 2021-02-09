import Context from "./context";
import User from "./models/user/user";
import UserRepository from "./repositories/userRepository";
import ConfigBuilder from "./session/configBuilder";
import SessionManager from "./session/sessionManager";

const authToken = '1e0761425a2655ba3ba6e315dbdb1fb764776018';

const backendUrl = "http://funcrowd.herokuapp.com";
let sessionManager: SessionManager = new SessionManager(
    backendUrl,
    new ConfigBuilder()
);

let context = new Context(sessionManager);

let userRepository: UserRepository = context.repositories.userRepository;



sessionManager.setupAuthToken(authToken);

userRepository.getUserMetrics(3).then((result) => {
    console.log(result);
})

/*

userRepository.register("admin", "admin@admin.pl", "password", "password").catch((response) => {
    console.log(typeof response.response);
});


userRepository.login("admin@admin.pl", "Wojtek1234").then((user: User) => {
    console.log(user);
});


userRepository.login("admin@admin.pl", "Test").catch((error: any) => {
    console.log(error.response.status);
    console.log(error.response.statusText);
    console.log(error.response.data);
});


sessionManager.setupAuthToken(authToken);

userRepository.getCurrentUserDetails().then((user: User) => {
    user.token = authToken;
    console.log(user);
});
*/