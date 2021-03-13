import AchievementRepository from "./repositories/achievementRepository";
import BountyRepository from "./repositories/bountyRepository";
import ItemRepository from "./repositories/itemRepository";
import MissionRepository from "./repositories/missionRepository";
import RankingRepository from "./repositories/rankingRepository";
import StorageRepository from "./repositories/storageRepository";
import TaskRepository from "./repositories/taskRepository";
import UserRepository from "./repositories/userRepository";
import SessionManager from "./session/sessionManager"


class ContextRepositories {
    constructor(
        public users: UserRepository,
        public bounties: BountyRepository,
        public missions: MissionRepository,
        public tasks: TaskRepository,
        public items: ItemRepository,
        public storages: StorageRepository,
        public achievements: AchievementRepository,
        public ranking: RankingRepository
    ) {}
}


export default class Context {
    repositories: ContextRepositories;

    constructor(public sessionManager: SessionManager) {
        this.repositories = new ContextRepositories(
            new UserRepository(sessionManager),
            new BountyRepository(sessionManager),
            new MissionRepository(sessionManager),
            new TaskRepository(sessionManager),
            new ItemRepository(sessionManager),
            new StorageRepository(sessionManager),
            new AchievementRepository(sessionManager),
            new RankingRepository(sessionManager)
        );
    }
}
