import Ranking from "../models/ranking/ranking";
import SessionManager from "../session/sessionManager";



/**
 * Contains all endpoints for the ranking built based on user's annotations count.
 */
class AnnotationRanking {
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Global ranking containing all users.
     * Arguments are used to handle the pagination:
     * @param page - number of page
     * @param size - number of rows on one page
     */
    async global(page: number = 0, size: number = 10): Promise<Ranking> {

        let response = await this._sessionManager.get(
            "ranking/annotations/top/?size=" + size + "&page=" + page);
        return Ranking.fromJson(response.data);
    }

    /**
     * Used to get user's position in the ranking.
     * Results are returned in a window together with rows before and after him.
     * @param userId - id of user for which the ranking will be generated
     * @param size - the size of the window before and after the user's row
     */
    async user(userId: number, size: number = 0): Promise<Ranking> {
        let response = await this._sessionManager.get(
            "ranking/annotations/around/" + userId + "/?size=" + size)
        return Ranking.fromJson(response.data);
    }
}


/**
 * Contains all endpoints for the ranking built based on user's total exp points.
 */
class ExpRanking {
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Global ranking containing all users.
     * Arguments are used to handle the pagination:
     * @param page - number of page
     * @param size - number of rows on one page
     */
    async global(page: number = 0, size: number = 10): Promise<Ranking> {

        let response = await this._sessionManager.get(
            "ranking/exp/top/?size=" + size + "&page=" + page);

        return Ranking.fromJson(response.data);
    }

    /**
     * Used to get user's position in the ranking.
     * Results are returned in a window together with rows before and after him.
     * @param userId - id of user for which the ranking will be generated
     * @param size - the size of the window before and after the user's row
     */
    async user(userId: number, size: number = 0): Promise<Ranking> {
        let response = await this._sessionManager.get(
            "ranking/exp/around/" + userId + "/?size=" + size)
        return Ranking.fromJson(response.data);
    }
}


/**
 * Provides interface to use ranking module's endpoints.
 */
export default class RankingRepository {
    /** Contains all endpoints for the ranking built based on user's annotations count.*/
    annotations: AnnotationRanking;
    /** Contains all endpoints for the ranking built based on user's total exp points.*/
    exp: ExpRanking;

    constructor(private _sessionManager: SessionManager) {
        this.annotations = new AnnotationRanking(this._sessionManager);
        this.exp = new ExpRanking(this._sessionManager);
    }
}
