
export interface IMissionProgress {
    missionId: number,
    tasksDone: number,
    tasksCount: number,
    progress: number,
    status: string
}

/**
 * Stores information about user's progress for a given mission
 */
export default class MissionProgress implements IMissionProgress {
    constructor(public missionId: number, public tasksDone: number, public tasksCount: number,
                public progress: number, public status: string) {}
                

    static fromJson(data: IMissionProgress) {
        let object = new MissionProgress(
            data.missionId,
            data.tasksDone,
            data.tasksCount,
            data.progress,
            data.status
        );
        return object;
    }
}
