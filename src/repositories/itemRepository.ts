import AnnotationResponse, { IAnnotationResponse } from "../models/annotation/annotationResponse";
import Item, { IItem } from "../models/item/item";
import SessionManager from "../session/sessionManager";


/**
 * 
 */
export default class ItemRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * 
     * @param taskId 
     */
    async nextItem(taskId: number): Promise<Item> {   
        const response = await this._sessionManager.get("tasks/" + taskId + "/next_item/");
        return Item.fromJson(response.data as IItem);
    }

    /**
     * 
     * @param itemId 
     */
    async subsequentItem(itemId: number): Promise<Item> { 
        const response = await this._sessionManager.get("items/" + itemId+ "/next_item/");
        return Item.fromJson(response.data as IItem);
    }

    /**
     * 
     * @param itemId 
     * @param payload 
     */
    async postAnnotation(itemId: number, payload: Object) {

        const response = await this._sessionManager.post("items/" + itemId+ "/annotation/",
            payload    
        );
        return AnnotationResponse.fromJson(response.data as IAnnotationResponse);
    } 
}
