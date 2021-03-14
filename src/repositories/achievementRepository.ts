import SessionManager from "../session/sessionManager";
import Achievement, {IAchievement} from "../models/achievement/achievement";

/**
 * Provides an interface to get information and progress for Achievements.
 */
export default class AchievementRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Used to get a list of all Achievements available in system,
     * together with a progress for each of them for currently logged User.
     */
    async list(): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * Used to get a list of all Achievements for selected Mission
     * together with a progress for each of them for currently logged User.
     * @param missionId - id of the mission
     */
    async listMission(missionId: number): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/mission/" + missionId + "/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * Used to get a list of all Achievements for selected Task
     * together with a progress for each of them for currently logged User.
     * @param taskId - id of the task
     */
    async listTask(taskId: number): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/task/" + taskId + "/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * Used to get all finished but not closed Achievements for currently logged User.
     */
    async listUnclosed(): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/unclosed/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }
}
