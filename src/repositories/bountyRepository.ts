import Bounty, { IBounty } from "../models/bounty/bounty";
import Item from "../models/item/item";
import SessionManager from "../session/sessionManager";


/**
 * 
 */
export default class BountyRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     */
    async list(): Promise<Bounty[]> {
        const response = await this._sessionManager.get("/api/v1/packages/status");
        return response.data.map((data: Object) => Bounty.fromJson(data as IBounty));
    }

    /**
     * 
     */
    async get(bountyId: number): Promise<Bounty> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/");
        return Bounty.fromJson(response.data);
    }

    /**
     * 
     */
    async getNextItem(bountyId: number): Promise<Item> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/items/next/");
        return Item.fromJson(response.data);
    }
}
