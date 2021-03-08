
export interface IAchievement {
    /** Id of the achievement object */
    id: number,
    /** Used to sort achievements in the right order */
    order: number,
    /**
     * Defines status of the achievement. Can be one of four values:
     * - NEW - user made no progress in this achievement.
     * - IN_PROGRESS - user made some progress in this achievement, but it's not finished yet.
     * - FINISHED - user finished the target task required by this achievement.
     * - CLOSED - achievement was finished and closed by the user. This can be used to e.g. verify if the user had seen a pop up message about finished achievement.
     */
    status: string,
    /** Describes progress user made in this achievement.
     *  Represents different value depending on the type of the achievement, e.g. login count for the user, the number of annotated items, etc
     */
    value: number,
    /** The target value required for the user to finish the achievement */
    target: number,
    /** The percentage progress showing how close to the target value user is*/
    progress: number,
    /** The date of the last update for this achievement */
    updated: Date,
    /** The exp value that user will get after finishing this achievement. */
    exp: number,
    /** Used to store additional metadata, e.g. link to an icon, etc.*/
    metadata: Object
}


export default class Achievement implements IAchievement {
    constructor(public id: number, public order: number, public status: string,
                public value: number, public target: number, public progress: number,
                public updated: Date, public exp: number, public metadata: Object) {}

    static fromJson(data: IAchievement) {
        let object = new Achievement(
            data.id,
            data.order,
            data.status,
            data.value,
            data.target,
            data.progress,
            data.updated,
            data.exp,
            data.metadata
        );
        return object;
    }
}
