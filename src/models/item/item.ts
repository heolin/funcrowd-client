import ItemTemplate, { IItemTemplate } from "./itemTemplate";

export interface IItem {
    id: number,
    taskId: number,
    data: Object,
    template: IItemTemplate,
    exp: number
}


export default class Item implements IItem {
    constructor(public id: number, public taskId: number, public data: Object,
                public template: IItemTemplate, public exp: number) {}

    static fromJson(data: IItem) {
        return new Item(
            data.id,
            data.taskId,
            data.data,
            ItemTemplate.fromJson(data.template),
            data.exp
        );
    }

    annotate() {
        
    }
}
