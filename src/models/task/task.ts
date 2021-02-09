
export interface ITask{
    id: number,
    missionId: number,
    name: string,
    description: string,
    instruction: string,
    keywords: string[],
    achievementsCount: number,
    totalExp: number,
    feedbackType: string,
    metadata: Object
}

/**
 * Stores the definition of a task
 */
export default class Task implements Task {
    constructor(public id: number, public missionId: number, public name: string,
                public description: string, public instruction: string,
                public keywords: string[], public achievementsCount: number,
                public totalExp: number, public metadata: Object) {}

    static fromJson(data: ITask) {
        let object = new Task(
            data.id,
            data.missionId,
            data.name,
            data.description,
            data.instruction,
            data.keywords,
            data.achievementsCount,
            data.totalExp,
            data.metadata
        );
        return object;
    }
}
