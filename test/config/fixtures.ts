import User from "../../src/models/user/user";
import ConfigBuilder from "../../src/session/configBuilder";
import SessionManager from "../../src/session/sessionManager";


export function userFixture() {
    return User.fromJson({
        'id': 1,
        'username': 'sample',
        'email': 'sample@email.com',
        'token': '12345',
        'profile': 2,
        'group': 2,
        'exp': 100
    });
}

export function sessionManagerFixture() {
    return new SessionManager(
        "localhost",
        configBuilderFixture()
    );
}

export function configBuilderFixture() {
    return new ConfigBuilder();
}
