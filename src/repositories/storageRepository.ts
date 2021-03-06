import Storage, { IStorage } from "../models/storage/storage";
import SessionManager from "../session/sessionManager";

interface IStoragePayload {
    data: any
}

interface IStorageBatchPayload {
    key: string,
    data: any
}


/**
 * 
 */
export default class StorageRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     */
    async list(): Promise<Storage[]> {
        const response = await this._sessionManager.get("users/storage/");
        return response.data.map((data: Object) => Storage.fromJson(data as IStorage));
    }

    /**
     * 
     */
    async get(key: string): Promise<Storage> {
        const response = await this._sessionManager.get("users/storage/" + key + "/");
        return Storage.fromJson(response.data);
    }

    /**
     * 
     */
    async post(key: string, payload: IStoragePayload): Promise<Storage> {
        const response = await this._sessionManager.post(
            "users/storage/" + key + "/", payload);
        return Storage.fromJson(response.data);
    }
    
    /**
     * 
     */
    async postBatch(payload: IStorageBatchPayload[]): Promise<Storage[]> {
        const response = await this._sessionManager.post("users/storage/", payload);
        return response.data.map((data: Object) => Storage.fromJson(data as IStorage));
    }

}
