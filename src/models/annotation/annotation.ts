import Item from "../item/item";


export default class Annotation {
    public data: Record<string, any>;

    constructor(public itemId: Item ) {
        this.data = {};
    }

    addOutput(fieldName: string, value: any): void {
        this.data[fieldName] = value;
    }
}
