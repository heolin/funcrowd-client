import Bounty, { IBounty } from "../models/bounty/bounty";
import BountyTemplate from "../models/bounty/bountyTemplate";
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
     * @param bountyId 
     */
    async get(bountyId: number): Promise<Bounty> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/");
        return Bounty.fromJson(response.data);
    }

    /**
     * 
     * @param bountyId 
     */
    async getNextItem(bountyId: number): Promise<Item> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/items/next/");
        return Item.fromJson(response.data);
    }

    /**
     * 
     * @param missionId 
     */
    async listMissionBounties(missionId: number): Promise<Bounty[]> {
        const response = await this._sessionManager.get(
            "/api/v1/missions/" + missionId + "/bounties");
        return response.data.map((data: Object) => Bounty.fromJson(data as IBounty));
    }

    /**
     * 
     * @param missionId 
     */
    async getMissionBountiesTemplate(missionId: number): Promise<BountyTemplate> {
        const response = await this._sessionManager.get(
            "/api/missions/" + missionId + "/bounties/template"
        )
        return BountyTemplate.fromJson(response.data);
    }
}
