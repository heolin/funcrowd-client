import SessionManager from "../session/sessionManager";
import Ranking from "../../src/models/ranking/ranking";

/**
 * 
 */
export default class RankingRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    async global(page: number, size: number) {
        let response = await this._sessionManager.get(
            "ranking/exp/top?size=" + size + "&page=" + page);

        return Ranking.fromJson(response.data);
    }

    async user(userId: number, size: number = 0) {
        let response = await this._sessionManager.get(
            "/ranking/exp/around" + userId + "/?size=0"
        )
        return Ranking.fromJson(response.data);
    }
}
