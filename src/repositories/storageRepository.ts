import Storage, { IStorage } from "../models/storage/storage";
import SessionManager from "../session/sessionManager";

/**
 * 
 */
export default class StorageRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     */
    async list(): Promise<Storage[]> {
        const response = await this._sessionManager.get("/api/v1/users/storage/");
        return response.data.map((data: Object) => Storage.fromJson(data as IStorage));
    }

    /**
     * 
     */
    async get(key: string): Promise<Storage> {
        const response = await this._sessionManager.get(
            "/api/v1/users/storage/" + key + "/");
        return Storage.fromJson(response.data);
    }

    /**
     * 
     */
    async post(key: string, payload: Object): Promise<Storage> {
        const response = await this._sessionManager.post(
            "/api/v1/users/storage/" + key + "/", payload);
        return Storage.fromJson(response.data);
    }
    
    /**
     * 
     */
    async postBatch(key: string, payload: Object): Promise<Storage[]> {
        const response = await this._sessionManager.post(
            "/api/v1/users/storage/" + key + "/", payload);
        return response.data.map((data: Object) => Storage.fromJson(data as IStorage));
    }

}
