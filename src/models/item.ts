
export default class Item {
    itemId: number;
    data: string | undefined;
    schema: string;


    constructor() {
        this.data = undefined;
        this.itemId = 0;
        this.schema = "";
    }
}
