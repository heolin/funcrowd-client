
export interface IUserMetrics {
    userId: number,
    annotatedDocuments: number,
    highAgreementCount: number,
    highAgreementPercentage: number,
    agreementRankingPosition: number,
    agreementRankingPercentage: number,
    annotatedMissions: number,
    annotatedTasks: number
}

/**
 * Stores basic quality metrics of the user.
 *
 * Statistic metricss:
 * - annotatedDocument - total number of annotated documents
 * - highAgreementCount - total number of annotations with a high agreement score
 * - highAgreementPerentage - percentage of the high agreement annotations to all annotations
 * - agreementRankingPosition - position of the user in the ranking created based on users' average agreement
 * - agreementRankingPercentage - percentage position of the user in the agreement ranking
 * - annotatedMissions - number of different missions with at least one user's annotation
 * - annotatedTasks - number of different tasks with at least one user's annotation
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
