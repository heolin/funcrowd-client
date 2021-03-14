import Mission, { IMission } from "../models/mission/mission";
import MissionProgress, { IMissionProgress } from "../models/mission/missionProgress";
import SessionManager from "../session/sessionManager";


/**
 * Provides an interface to get information about Missions.
 * Allows to get a list of all Missions available in the system,
 * as well as information about a selected mission. Also supports
 * endpoints that are used to get a detailed information about
 * the progress of the currently logged in user in Missions.
 */
export default class MissionRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Used to get a list of all Missions available in the system.
     */
    async list(): Promise<Mission[]> {
        const response = await this._sessionManager.get("missions/");

        let missions: Mission[] = response.data.map(
            (data: Object) => Mission.fromJson(data as IMission));
        return missions;
    }

    /**
     * Used to get a selected Mission object.
     * @param missionId - id of the Mission
     */
    async get(missionId: number): Promise<Mission> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/");

        let mission = Mission.fromJson(response.data);
        return mission;
    }

    /**
     * Used to get a information about the progress of currently logged in user
     * in all of Missions available in the system.
     */
    async progressList(): Promise<MissionProgress[]> {
        const response = await this._sessionManager.get("missions/progress");

        let missions: MissionProgress[] = response.data.map(
            (data: Object) => MissionProgress.fromJson(data as IMissionProgress));
        return missions;
    }

    /**
     * Used to get a information about the progress of currently logged in user
     * in the selected mission.
     * @param missionId - id of the Mission
     */
    async progress(missionId: number): Promise<MissionProgress> {
        const response = await this._sessionManager.get(
            "missions/" + missionId + "/progress/");

        let mission = MissionProgress.fromJson(response.data);
        return mission;
    }
}
