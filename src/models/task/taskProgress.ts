
export interface ITaskProgress {
    taskId: number,
    itemsDone: number,
    itemsCount: number,
    progress: number,
    status: string,
    maxScore: number,
    score: number
}

/**
 * Stores information about user's progress for a given Task.
 */
export default class TaskProgress implements ITaskProgress {
    constructor(public taskId: number, public itemsDone: number, public itemsCount: number,
                public progress: number, public status: string, public maxScore: number,
                public score: number) {}
                

    static fromJson(data: ITaskProgress) {
        let object = new TaskProgress(
            data.taskId,
            data.itemsDone,
            data.itemsCount,
            data.progress,
            data.status,
            data.maxScore,
            data.score
        );
        return object;
    }
}
