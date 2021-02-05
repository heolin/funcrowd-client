
export interface IUserStats {
    id: number,
    annotatedDocuments: number,
    highAgreementCount: number,
    highAgreementPercentage: number,
    agreementRankingPosition: number,
    agreementRankingPercentage: number,
    annotatedMissions: number,
    annotatedTasks: number
}

/**
 * 
 */
export default class UserStats implements IUserStats {
    constructor(public id: number,
                public annotatedDocuments: number,
                public highAgreementCount: number,
                public highAgreementPercentage: number,
                public agreementRankingPosition: number,
                public agreementRankingPercentage: number,
                public annotatedMissions: number,
                public annotatedTasks: number) {}

    static fromJson(data: IUserStats) {
        let stats = new UserStats(
            data.id,
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
