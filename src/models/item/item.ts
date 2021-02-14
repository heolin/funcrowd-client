
export interface IItem {

}


export default class Item implements IItem {
    constructor() {
    
    }

    static fromJson(data: IItem) {
        return new Item();
    }

    annotate() {
        
    }
}
