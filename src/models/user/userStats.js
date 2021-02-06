"use strict";
exports.__esModule = true;
/**
 *
 */
var UserStats = /** @class */ (function () {
    function UserStats(id, annotatedDocuments, highAgreementCount, highAgreementPercentage, agreementRankingPosition, agreementRankingPercentage, annotatedMissions, annotatedTasks) {
        this.id = id;
        this.annotatedDocuments = annotatedDocuments;
        this.highAgreementCount = highAgreementCount;
        this.highAgreementPercentage = highAgreementPercentage;
        this.agreementRankingPosition = agreementRankingPosition;
        this.agreementRankingPercentage = agreementRankingPercentage;
        this.annotatedMissions = annotatedMissions;
        this.annotatedTasks = annotatedTasks;
    }
    UserStats.fromJson = function (data) {
        var stats = new UserStats(data.id, data.annotatedDocuments, data.highAgreementCount, data.highAgreementPercentage, data.agreementRankingPosition, data.agreementRankingPercentage, data.annotatedMissions, data.annotatedTasks);
        return stats;
    };
    return UserStats;
}());
exports["default"] = UserStats;
