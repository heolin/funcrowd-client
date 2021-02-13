
/**
 * Interface storing the UserMetrics data
 */
export interface IUserMetrics {
    /** Id of the user */
    userId: number,
    /** Total number of annotated documents */
    annotatedDocuments: number,
    /** Total number of annotations with a high agreement score */
    highAgreementCount: number,
    /** Percentage of the high agreement annotations to all annotations */
    highAgreementPercentage: number,
    /** Position of the user in the ranking created based on users' average agreement */
    agreementRankingPosition: number,
    /** Percentage position of the user in the agreement ranking */
    agreementRankingPercentage: number,
    /** Number of different missions with at least one user's annotation */
    annotatedMissions: number,
    /** Number of different tasks with at least one user's annotation */
    annotatedTasks: number
}

/**
 * Stores basic quality metrics of the user.
 * Metrics are recalculate automatically after the annotations, so
 * they are always up to date.
 */
export default class UserMetrics implements IUserMetrics {
    constructor(public userId: number,
                public annotatedDocuments: number,
                public highAgreementCount: number,
                public highAgreementPercentage: number,
                public agreementRankingPosition: number,
                public agreementRankingPercentage: number,
                public annotatedMissions: number,
                public annotatedTasks: number) {}

    static fromJson(data: IUserMetrics) {
        let stats = new UserMetrics(
            data.userId,
            data.annotatedDocuments,
            data.highAgreementCount,
            data.highAgreementPercentage,
            data.agreementRankingPosition,
            data.agreementRankingPercentage,
            data.annotatedMissions,
            data.annotatedTasks
        );
        return stats;
    }
}
