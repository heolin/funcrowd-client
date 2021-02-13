import MissionRepository from "./repositories/missionRepository";
import StorageRepository from "./repositories/storageRepository";
import TaskRepository from "./repositories/taskRepository";
import UserRepository from "./repositories/userRepository";
import SessionManager from "./session/sessionManager"

class ContextRepositories {
    constructor(
        public users: UserRepository,
        public missions: MissionRepository,
        public tasks: TaskRepository,
        public storages: StorageRepository
    ) {}
}


export default class Context {
    repositories: ContextRepositories;

    constructor(public sessionManager: SessionManager) {
        this.repositories = new ContextRepositories(
            new UserRepository(sessionManager),
            new MissionRepository(sessionManager),
            new TaskRepository(sessionManager),
            new StorageRepository(sessionManager)
        );
    }
}
