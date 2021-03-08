import SessionManager from "../session/sessionManager";
import Achievement, {IAchievement} from "../models/achievement/achievement";

/**
 * 
 */
export default class AchievementRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     */
    async list(): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * 
     * @param missionId 
     */
    async listMission(missionId: number): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/mission/" + missionId + "/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * 
     * @param taskId 
     */
    async listTask(taskId: number): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/task/" + taskId + "/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }

    /**
     * 
     */
    async listUnclosed(): Promise<Achievement[]> {
        let response = await this._sessionManager.get(
            "achievements/unclosed/");
        return response.data.map((data: Object) => Achievement.fromJson(data as IAchievement));
    }
}
