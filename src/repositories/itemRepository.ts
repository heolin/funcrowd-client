import AnnotationResponse, { IAnnotationResponse } from "../models/annotation/annotationResponse";
import Item, { IItem } from "../models/item/item";
import SessionManager from "../session/sessionManager";


/**
 * The main repository to do the actual data annotation.
 * It provides an interface to get Items and post prepared Annotations.
 */
export default class ItemRepository {
    
    constructor(private _sessionManager: SessionManager) {}

    /**
     * Used to get the next available Item for currently logged in User.
     * The Items order depends on the selected order strategy for the Task.
     * If user already annotated one Item it won't be returned again.
     * If there are no more Items to return it will return `undefined`
     * @param taskId 
     */
    async nextItem(taskId: number): Promise<Nullable<Item>> {   
        const response = await this._sessionManager.get("tasks/" + taskId + "/next_item/");
        return Item.fromJson(response.data as IItem);
    }

    /**
     * Used to get the next item after the provided one based on their predefined order.
     * It works only if the "Static" order strategy was selected for the Task.
     * It can return the same Item, even if User already annotated it before.
     * If there are no more Items to return it will return `undefined`
     * @param itemId - id of the Item for which we want to get a subsequent Item
     */
    async subsequentItem(itemId: number): Promise<Nullable<Item>> { 
        const response = await this._sessionManager.get("items/" + itemId+ "/next_item/");
        return Item.fromJson(response.data as IItem);
    }

    /**
     * Used to post prepared Annotations for selected Item.
     * @param itemId - id of the Item
     * @param payload - a payload containing User's annotations
     */
    async postAnnotation(itemId: number, payload: Record<string, any>) {

        const response = await this._sessionManager.post("items/" + itemId+ "/annotation/",
            payload    
        );
        return AnnotationResponse.fromJson(response.data as IAnnotationResponse);
    } 
}
