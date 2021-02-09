
export interface IMission {
    id: number,
    name: string,
    description: string,
    instruction: string,
    tasksCount: number,
    achievementsCount: number,
    totalExp: number,
    metadata: Object
}

/**
 * Stores the definition of a mission
 */
export default class Mission implements IMission {
    constructor(public id: number, public name: string, public description: string,
                public instruction: string, public tasksCount: number, public achievementsCount: number,
                public totalExp: number, public metadata: Object) {}
                

    static fromJson(data: IMission) {
        let object = new Mission(
            data.id,
            data.name,
            data.description,
            data.instruction,
            data.tasksCount,
            data.achievementsCount,
            data.totalExp,
            data.metadata
        );
        return object;
    }
}
