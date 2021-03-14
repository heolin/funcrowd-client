import Bounty, { IBounty } from "../models/bounty/bounty";
import BountyTemplate from "../models/bounty/bountyTemplate";
import Item from "../models/item/item";
import SessionManager from "../session/sessionManager";


/**
 * Provides an interface to get Bounties objects as well as Items that
 * are part of them.
 */
export default class BountyRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Used to get all Bounties available in the system.
     */
    async list(): Promise<Bounty[]> {
        const response = await this._sessionManager.get("/api/v1/packages/status");
        return response.data.map((data: Object) => Bounty.fromJson(data as IBounty));
    }

    /**
     * Used to get a selected Bounty.
     * @param bountyId - id of the Bounty
     */
    async get(bountyId: number): Promise<Bounty> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/");
        return Bounty.fromJson(response.data);
    }

    /**
     * Used to get the next available Item for currently logged in User.
     * The Items order depends on the selected order strategy for the Bounty.
     * If user already annotated one Item it won't be returned again.
     * If there are no more Items to return it will return `undefined`
     * @param bountyId - id of the Bounty
     */
    async getNextItem(bountyId: number): Promise<Nullable<Item>> {
        const response = await this._sessionManager.get(
            "/api/v1/packages/" + bountyId + "/items/next/");
        return Item.fromJson(response.data);
    }

    /**
     * Used to get a list of all Bounties for selected Mission.
     * @param missionId - id of the Mission
     */
    async listMissionBounties(missionId: number): Promise<Bounty[]> {
        const response = await this._sessionManager.get(
            "/api/v1/missions/" + missionId + "/bounties/");
        return response.data.map((data: Object) => Bounty.fromJson(data as IBounty));
    }

    /**
     * Used to get a BountyTemplate for selected Bounty.
     * @param bountyId - id of the Bounty
     */
    async getMissionBountiesTemplate(bountyId: number): Promise<BountyTemplate> {
        const response = await this._sessionManager.get(
            "/api/packages/" + bountyId + "/template/"
        )
        return BountyTemplate.fromJson(response.data);
    }
}
