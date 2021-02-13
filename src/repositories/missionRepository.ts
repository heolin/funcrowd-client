import Mission, { IMission } from "../models/mission/mission";
import MissionProgress, { IMissionProgress } from "../models/mission/missionProgress";
import SessionManager from "../session/sessionManager";


/**
 * 
 */
export default class MissionRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     */
    async list(): Promise<Mission[]> {
        const response = await this._sessionManager.get("missions/");

        let missions: Mission[] = response.data.map(
            (data: Object) => Mission.fromJson(data as IMission));
        return missions;
    }

    /**
     * 
     * @param missionId 
     */
    async get(missionId: number): Promise<Mission> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/");

        let mission = Mission.fromJson(response.data);
        return mission;
    }

    /**
     * 
     */
    async progressList(): Promise<MissionProgress[]> {
        const response = await this._sessionManager.get("missions/progress");

        let missions: MissionProgress[] = response.data.map(
            (data: Object) => MissionProgress.fromJson(data as IMissionProgress));
        return missions;
    }

    /**
     * 
     * @param missionId 
     */
    async progress(missionId: number): Promise<MissionProgress> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/progress/");

        let mission = MissionProgress.fromJson(response.data);
        return mission;
    }
}
