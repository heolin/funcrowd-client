import Ranking from "../models/ranking/ranking";
import SessionManager from "../session/sessionManager";



class AnnotationRanking {
    constructor(private _sessionManager: SessionManager) {}

    async global(page: number = 0, size: number = 10): Promise<Ranking> {

        let response = await this._sessionManager.get(
            "ranking/annotations/top/?size=" + size + "&page=" + page);
        return Ranking.fromJson(response.data);
    }

    async user(userId: number, size: number = 0): Promise<Ranking> {
        let response = await this._sessionManager.get(
            "ranking/annotations/around/" + userId + "/?size=" + size)
        return Ranking.fromJson(response.data);
    }
}


class ExpRanking {
    constructor(private _sessionManager: SessionManager) {}

    async global(page: number = 0, size: number = 10): Promise<Ranking> {

        let response = await this._sessionManager.get(
            "ranking/exp/top/?size=" + size + "&page=" + page);

        return Ranking.fromJson(response.data);
    }

    async user(userId: number, size: number = 0): Promise<Ranking> {
        let response = await this._sessionManager.get(
            "ranking/exp/around/" + userId + "/?size=" + size)
        return Ranking.fromJson(response.data);
    }
}


/**
 * 
 */
export default class RankingRepository {
    annotations: AnnotationRanking;
    exp: ExpRanking;

    constructor(private _sessionManager: SessionManager) {
        this.annotations = new AnnotationRanking(this._sessionManager);
        this.exp = new ExpRanking(this._sessionManager);
    }

}



